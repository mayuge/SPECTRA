from fastapi import HTTPException, Request
import httpx
import asyncio


class OsmRepository:
    BASE_URL = "https://overpass-api.de/api/interpreter"

    # ------------------------------------------------------------
    # 都道府県で取得（admin_level=4）
    # ------------------------------------------------------------
    async def get_osm_tag_by_prefecture(self, tag: str, prefecture: str, request: Request):
        key, value = self._parse_tag(tag)

        overpass_query = f"""
        [out:json][timeout:50];

        rel["name"="{prefecture}"]["admin_level"="4"];
        map_to_area -> .searchArea;

        (
          node["{key}"="{value}"](area.searchArea);
          way["{key}"="{value}"](area.searchArea);
          relation["{key}"="{value}"](area.searchArea);
        );

        out geom qt;
        """

        osm_json = await self._run_overpass(overpass_query)
        return self._convert_osm_to_geojson(osm_json)

    # ------------------------------------------------------------
    # 市区町村で取得
    # ------------------------------------------------------------
    async def get_osm_tag_by_city(self, tag: str, city: str, request: Request):
        key, value = self._parse_tag(tag)

        overpass_query = f"""
        [out:json][timeout:50];

        (
        rel["name"="{city}"]["boundary"="administrative"];
        rel["name:ja"="{city}"]["boundary"="administrative"];
        )->.adminRel;

        .adminRel map_to_area -> .searchArea;

        (
        node["{key}"="{value}"](area.searchArea);
        way["{key}"="{value}"](area.searchArea);
        relation["{key}"="{value}"](area.searchArea);
        )->.targetData;

        way(r.adminRel)->.adminWays;

        (.targetData; .adminWays;);

        out geom qt;
        """

        osm_json = await self._run_overpass(overpass_query)
        return self._convert_osm_to_geojson(osm_json)
    # ------------------------------------------------------------
    # key=value パース
    # ------------------------------------------------------------
    def _parse_tag(self, tag: str):
        if "=" not in tag:
            raise HTTPException(
                400,
                "tag は 'key=value' 形式で指定してください (例: amenity=toilets)"
            )
        return tag.split("=", 1)

    # ------------------------------------------------------------
    # Overpass API 実行（リトライ付き）
    # ------------------------------------------------------------
    async def _run_overpass(self, query: str):
        for attempt in range(3):
            try:
                async with httpx.AsyncClient(timeout=60.0) as client:
                    response = await client.post(
                        self.BASE_URL,
                        data={"data": query},
                        headers={"User-Agent": "FastAPI OSM Client"},
                    )
                    response.raise_for_status()
                    return response.json()

            except httpx.HTTPStatusError as e:
                if "timeout" in e.response.text.lower() and attempt < 2:
                    await asyncio.sleep(1.5)
                    continue
                raise HTTPException(500, f"Overpass API エラー: {e.response.text}")

            except Exception as e:
                raise HTTPException(500, f"Overpass API 接続エラー: {e}")

        raise HTTPException(500, "Overpass API が混雑しています")

    # ------------------------------------------------------------
    # OSM → GeoJSON 変換（優先順位フィルタ入り）
    # ------------------------------------------------------------
    def _convert_osm_to_geojson(self, osm_json: dict):
        polygons = []
        lines = []
        points = []

        for elem in osm_json.get("elements", []):
            elem_type = elem["type"]

            # --------------------------------
            # Node → Point
            # --------------------------------
            if elem_type == "node":
                geom = {
                    "type": "Point",
                    "coordinates": [elem["lon"], elem["lat"]],
                }
                points.append(self._build_feature(elem, geom))
                continue

            # --------------------------------
            # Way → Polygon or LineString
            # --------------------------------
            if elem_type == "way":
                coords = [[p["lon"], p["lat"]] for p in elem.get("geometry", [])]

                if len(coords) >= 4 and coords[0] == coords[-1]:
                    geom = {"type": "Polygon", "coordinates": [coords]}
                    polygons.append(self._build_feature(elem, geom))
                else:
                    geom = {"type": "LineString", "coordinates": coords}
                    lines.append(self._build_feature(elem, geom))
                continue

            # --------------------------------
            # Relation → Polygon / MultiPolygon / LineString
            # --------------------------------
            if elem_type == "relation":
                members = elem.get("members", [])
                rings = []

                # way の geometry を ring として使用
                for mem in members:
                    if mem["type"] == "way" and "geometry" in mem:
                        coords = [[p["lon"], p["lat"]] for p in mem["geometry"]]
                        if len(coords) >= 4 and coords[0] == coords[-1]:
                            rings.append(coords)

                if len(rings) == 1:
                    geom = {"type": "Polygon", "coordinates": [rings[0]]}
                    polygons.append(self._build_feature(elem, geom))
                elif len(rings) > 1:
                    geom = {"type": "MultiPolygon", "coordinates": [[r] for r in rings]}
                    polygons.append(self._build_feature(elem, geom))
                else:
                    # 閉じていない場合は LineString として扱う
                    coords = [[p["lon"], p["lat"]] for p in elem.get("geometry", [])]
                    geom = {"type": "LineString", "coordinates": coords}
                    lines.append(self._build_feature(elem, geom))

        # ------------------------------------------------------------
        # 優先順位フィルタ：Polygon ＞ Line ＞ Point
        # ------------------------------------------------------------
        if len(polygons) > 0:
            selected = polygons
        elif len(lines) > 0:
            selected = lines
        else:
            selected = points

        return {
            "type": "FeatureCollection",
            "features": selected
        }

    # ------------------------------------------------------------
    # 共通 Feature 生成
    # ------------------------------------------------------------
    def _build_feature(self, elem, geometry):
        return {
            "type": "Feature",
            "geometry": geometry,
            "properties": elem.get("tags", {}),
            "id": elem.get("id")
        }
