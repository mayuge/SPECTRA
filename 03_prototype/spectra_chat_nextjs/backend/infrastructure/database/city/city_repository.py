import json
from fastapi import HTTPException, Request

class CityRepository:
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

