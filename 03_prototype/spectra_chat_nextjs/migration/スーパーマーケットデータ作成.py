#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
日本全国のスーパーマーケットを Overpass API から取得し、
47都道府県ごとに分割 → 自動リトライ → 統合する完全版スクリプト
"""

import asyncio
import httpx
import json
from pathlib import Path
import random

# Overpass API のエンドポイント
BASE_URL = "https://overpass-api.de/api/interpreter"

# 出力フォルダ
OUTPUT_DIR = Path("data/osm_supermarkets")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 都道府県リスト
PREFS = [
    "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
    "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
    "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
    "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
    "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
    "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
    "熊本県","大分県","宮崎県","鹿児島県","沖縄県"
]

async def fetch_supermarkets(pref: str, retries: int = 3):
    """指定都道府県のスーパーマーケットを取得して保存（リトライ付き）"""
    out_path = OUTPUT_DIR / f"{pref}.geojson"
    if out_path.exists():
        print(f"⏭ {pref}: 既存ファイルがあるためスキップ")
        return

    query = f"""
    [out:json];
    area["name"="{pref}"]->.searchArea;
    (
      node["shop"="supermarket"](area.searchArea);
      way["shop"="supermarket"](area.searchArea);
      relation["shop"="supermarket"](area.searchArea);
    );
    out center;
    """

    for attempt in range(1, retries + 1):
        async with httpx.AsyncClient(timeout=120.0) as client:
            try:
                response = await client.post(BASE_URL, data={"data": query})
                response.raise_for_status()
                data = response.json()
                with out_path.open("w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                print(f"✅ {pref}: {len(data.get('elements', []))} 件 取得")
                return
            except httpx.HTTPStatusError as e:
                if e.response.status_code in (429, 504):
                    wait = random.randint(30, 90)
                    print(f"⚠️ {pref}: {e.response.status_code}（{attempt}/{retries}回目）→ {wait}秒待機")
                    await asyncio.sleep(wait)
                else:
                    print(f"❌ {pref}: HTTPエラー {e}")
                    break
            except Exception as e:
                wait = random.randint(10, 30)
                print(f"⚠️ {pref}: {e} → {wait}秒待機")
                await asyncio.sleep(wait)
    print(f"❌ {pref}: 取得失敗（{retries}回試行後）")


async def fetch_all():
    """全都道府県のデータを順次取得"""
    for pref in PREFS:
        await fetch_supermarkets(pref)
        await asyncio.sleep(random.randint(15, 30))  # API制限対策
    print("✅ 全都道府県の取得完了")


def merge_geojson_files():
    """すべての都道府県ファイルを統合して1つのGeoJSONにする"""
    all_features = []

    for path in OUTPUT_DIR.glob("*.geojson"):
        with path.open(encoding="utf-8") as f:
            data = json.load(f)
            for el in data.get("elements", []):
                # 座標抽出
                if "lat" in el and "lon" in el:
                    geometry = {"type": "Point", "coordinates": [el["lon"], el["lat"]]}
                elif "center" in el:
                    geometry = {"type": "Point", "coordinates": [el["center"]["lon"], el["center"]["lat"]]}
                else:
                    continue
                all_features.append({
                    "type": "Feature",
                    "geometry": geometry,
                    "properties": el.get("tags", {}),
                })

    geojson = {"type": "FeatureCollection", "features": all_features}

    merged_path = OUTPUT_DIR / "supermarkets_japan.geojson"
    with merged_path.open("w", encoding="utf-8") as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)

    print(f"✅ 統合完了: {len(all_features)} 件 → {merged_path}")


if __name__ == "__main__":
    # Step 1: 各都道府県を順に取得
    asyncio.run(fetch_all())

    # Step 2: 統合
    merge_geojson_files()
