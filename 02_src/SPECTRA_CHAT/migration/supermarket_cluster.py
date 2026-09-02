
"""
OpenStreetMapのOverpass APIから、
日本全国のスーパーマーケットデータを取得する。

日本全国を0.5度 × 0.5度のグリッドに分割し、
各グリッド単位でOverpass APIへ問い合わせる。

取得対象:
    node["shop"="supermarket"]
    way["shop"="supermarket"]
    relation["shop"="supermarket"]

取得したデータはGeoJSONのPointへ変換し、
全国のデータを1つのGeoJSONへ統合する。
"""

import asyncio
import json
import random
from pathlib import Path

import httpx


# ============================================================
# 定数
# ============================================================

BASE_URL = "https://overpass-api.de/api/interpreter"

OUTPUT_DIR = Path("data/osm_supermarkets")

OUTPUT_FILE = OUTPUT_DIR / "supermarkets_japan.geojson"

GRID_SIZE = 0.5

MIN_LATITUDE = 24.0
MAX_LATITUDE = 46.0

MIN_LONGITUDE = 122.0
MAX_LONGITUDE = 146.0

REQUEST_TIMEOUT = 180.0

MAX_RETRIES = 3

MIN_WAIT_SECONDS = 10

MAX_WAIT_SECONDS = 30

USER_AGENT = "SPECTRA_CHAT/1.0 (GIS data collection)"

HEADERS = {
    "User-Agent": USER_AGENT,
    "Accept": "application/json",
}


# ============================================================
# グリッド生成
# ============================================================

def generate_grid():
    """
    日本全国を0.5度×0.5度のグリッドに分割する。

    Returns:
        list[tuple[float, float, float, float]]:
            (min_lat, min_lon, max_lat, max_lon) のリスト。
    """

    grids = []

    latitude = MIN_LATITUDE

    while latitude < MAX_LATITUDE:

        longitude = MIN_LONGITUDE

        while longitude < MAX_LONGITUDE:

            min_latitude = latitude
            min_longitude = longitude

            max_latitude = min(
                latitude + GRID_SIZE,
                MAX_LATITUDE,
            )

            max_longitude = min(
                longitude + GRID_SIZE,
                MAX_LONGITUDE,
            )

            grids.append(
                (
                    min_latitude,
                    min_longitude,
                    max_latitude,
                    max_longitude,
                )
            )

            longitude += GRID_SIZE

        latitude += GRID_SIZE

    return grids


# ============================================================
# Overpassクエリ生成
# ============================================================

def create_query(
    min_latitude: float,
    min_longitude: float,
    max_latitude: float,
    max_longitude: float,
):
    """
    指定されたBBoxからOverpass APIのクエリを生成する。

    Args:
        min_latitude: 南端の緯度。
        min_longitude: 西端の経度。
        max_latitude: 北端の緯度。
        max_longitude: 東端の経度。

    Returns:
        str: Overpass QLクエリ。
    """

    bbox = (
        f"{min_latitude},"
        f"{min_longitude},"
        f"{max_latitude},"
        f"{max_longitude}"
    )

    return f"""
[out:json][timeout:120];

(
  node["shop"="supermarket"]({bbox});
  way["shop"="supermarket"]({bbox});
  relation["shop"="supermarket"]({bbox});
);

out center;
"""


# ============================================================
# グリッド取得
# ============================================================

async def fetch_grid(
    client: httpx.AsyncClient,
    grid_index: int,
    total_grids: int,
    bbox: tuple[float, float, float, float],
):
    """
    1つのグリッドからスーパーマーケットを取得する。

    Args:
        client: HTTPクライアント。
        grid_index: グリッド番号。
        total_grids: グリッド総数。
        bbox: (min_lat, min_lon, max_lat, max_lon)。

    Returns:
        list[dict]: Overpass APIから取得したOSM要素。
    """

    (
        min_latitude,
        min_longitude,
        max_latitude,
        max_longitude,
    ) = bbox

    query = create_query(
        min_latitude,
        min_longitude,
        max_latitude,
        max_longitude,
    )

    for attempt in range(1, MAX_RETRIES + 1):

        try:

            print(
                f"📡 [{grid_index}/{total_grids}] "
                f"{min_latitude:.1f},{min_longitude:.1f} "
                f"→ "
                f"{max_latitude:.1f},{max_longitude:.1f}"
            )

            response = await client.post(
                BASE_URL,
                data={"data": query},
            )

            response.raise_for_status()

            data = response.json()

            elements = data.get("elements", [])

            print(
                f"   ✅ {len(elements)} 件取得"
            )

            return elements

        except httpx.HTTPStatusError as error:

            status_code = error.response.status_code

            if status_code in (
                429,
                500,
                502,
                503,
                504,
            ):

                wait_seconds = random.randint(
                    MIN_WAIT_SECONDS,
                    MAX_WAIT_SECONDS,
                )

                print(
                    f"   ⚠️ HTTP {status_code} "
                    f"({attempt}/{MAX_RETRIES}) "
                    f"→ {wait_seconds}秒待機"
                )

                await asyncio.sleep(wait_seconds)

            else:

                print(
                    f"   ❌ HTTP {status_code}"
                )

                return []

        except Exception as error:

            wait_seconds = random.randint(
                MIN_WAIT_SECONDS,
                MAX_WAIT_SECONDS,
            )

            print(
                f"   ⚠️ {error} "
                f"({attempt}/{MAX_RETRIES}) "
                f"→ {wait_seconds}秒待機"
            )

            await asyncio.sleep(wait_seconds)

    print(
        f"   ❌ 取得失敗 "
        f"({MAX_RETRIES}回試行)"
    )

    return []


# ============================================================
# OSM → GeoJSON
# ============================================================

def convert_to_feature(element: dict):
    """
    Overpass APIのOSM要素をGeoJSON Featureへ変換する。

    Args:
        element: OSM要素。

    Returns:
        dict | None: GeoJSON Feature。
        座標が取得できない場合はNone。
    """

    if "lat" in element and "lon" in element:

        longitude = element["lon"]
        latitude = element["lat"]

    elif "center" in element:

        longitude = element["center"]["lon"]
        latitude = element["center"]["lat"]

    else:

        return None

    properties = element.get("tags", {}).copy()

    properties["osm_id"] = element.get("id")
    properties["osm_type"] = element.get("type")

    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                longitude,
                latitude,
            ],
        },
        "properties": properties,
    }


# ============================================================
# GeoJSON保存
# ============================================================

def save_geojson(features: list[dict]):
    """
    GeoJSON FeatureCollectionを保存する。

    Args:
        features: GeoJSON Featureのリスト。
    """

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    geojson = {
        "type": "FeatureCollection",
        "features": features,
    }

    with OUTPUT_FILE.open(
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            geojson,
            file,
            ensure_ascii=False,
            indent=2,
        )

    print()
    print("========================================")
    print("✅ GeoJSON生成完了")
    print(f"   件数: {len(features)}")
    print(f"   出力: {OUTPUT_FILE}")
    print("========================================")


# ============================================================
# メイン処理
# ============================================================

async def fetch_all():
    """
    日本全国のグリッドからデータを取得する。

    Returns:
        list[dict]: 取得したすべてのOSM要素。
    """

    grids = generate_grid()

    total_grids = len(grids)

    print(
        f"🗺️ グリッド数: {total_grids}"
    )

    all_elements = []

    async with httpx.AsyncClient(
        timeout=REQUEST_TIMEOUT,
        headers=HEADERS,
    ) as client:

        for index, bbox in enumerate(
            grids,
            start=1,
        ):

            elements = await fetch_grid(
                client,
                index,
                total_grids,
                bbox,
            )

            all_elements.extend(elements)

            wait_seconds = random.randint(
                MIN_WAIT_SECONDS,
                MAX_WAIT_SECONDS,
            )

            await asyncio.sleep(
                wait_seconds
            )

    return all_elements


def remove_duplicates(
    elements: list[dict],
):
    """
    OSM IDとタイプを利用して重複要素を除去する。

    Args:
        elements: OSM要素のリスト。

    Returns:
        list[dict]: 重複を除去したOSM要素。
    """

    unique_elements = {}

    for element in elements:

        key = (
            element.get("type"),
            element.get("id"),
        )

        unique_elements[key] = element

    return list(
        unique_elements.values()
    )


def main():
    """
    日本全国のスーパーマーケットデータを取得してGeoJSONを生成する。
    """

    elements = asyncio.run(
        fetch_all()
    )

    print()
    print(
        f"📦 取得要素数: {len(elements)}"
    )

    elements = remove_duplicates(
        elements
    )

    print(
        f"🧹 重複除去後: {len(elements)}"
    )

    features = []

    for element in elements:

        feature = convert_to_feature(
            element
        )

        if feature is not None:
            features.append(feature)

    save_geojson(features)


if __name__ == "__main__":
    main()

