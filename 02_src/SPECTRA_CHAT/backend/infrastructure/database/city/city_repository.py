import json
from fastapi import HTTPException, Request

class CityRepository:

     # ✅ 許可するテーブル名
    ALLOWED_TABLES = {
        "l02_25",
        "supermarkets_japan",
        "unkohonsu2024_rosen_eki",
        "unkohonsu2024_rosen_kukan"
        "p29_23"
    }

    async def get_overlaps_by_table(
        self,
        city_name: str,
        table_name: str,
        request: Request
    ):
        if table_name not in self.ALLOWED_TABLES:
            raise HTTPException(
                status_code=400,
                detail=f"許可されていないテーブル名: {table_name}"
            )

        query = f"""
        SELECT jsonb_build_object(
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(o.geometry)::jsonb,
        'properties', to_jsonb(o) - 'geometry'
        ) AS geojson
        FROM n03_20250101 c
        JOIN {table_name} o
        ON ST_Intersects(
            c.geometry,
            ST_Transform(o.geometry, 6668)
        )
        WHERE c."n03_004" = $1
        """

        async with request.app.state.pool.acquire() as conn:
            rows = await conn.fetch(query, city_name)
            if not rows:
                return {"type": "FeatureCollection", "features": []}

            features = [json.loads(r["geojson"]) for r in rows]
            return {"type": "FeatureCollection", "features": features}
        
    async def get_city_by_name(self, city_name: str, request: Request):
        query = """
        SELECT jsonb_build_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(geometry)::jsonb,
          'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM n03_20250101 row
        WHERE "n03_004" = $1
        """
        async with request.app.state.pool.acquire() as conn:
            rows = await conn.fetch(query, city_name)
            if not rows:
                raise HTTPException(status_code=404, detail=f"City not found: {city_name}")

            # 複数行でもまとめて FeatureCollection にする
            features = [json.loads(r["geojson"]) for r in rows]
            return {"type": "FeatureCollection", "features": features}
    
    async def get_prefecture_by_name(self, prefecture_name: str, request: Request):
        query = """
        SELECT jsonb_build_object(
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(geometry)::jsonb,
        'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM n03_20250101 row
        WHERE "n03_001" = $1;
        """
        async with request.app.state.pool.acquire() as conn:
            rows = await conn.fetch(query, prefecture_name)
            if not rows:
                raise HTTPException(status_code=404, detail=f"Prefecture not found: {prefecture_name}")

            # 県内の市区町村が全部入る
            features = [json.loads(r["geojson"]) for r in rows]
            return {"type": "FeatureCollection", "features": features}

