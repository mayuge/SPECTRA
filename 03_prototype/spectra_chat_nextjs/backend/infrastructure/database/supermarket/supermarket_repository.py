import json
from fastapi import HTTPException, Request

class SupermarketRepository:
    async def get_all_supermarkets(self, request: Request):
        """すべてのスーパーマーケットをGeoJSONで取得"""
        query = """
        SELECT jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geometry)::jsonb,
            'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM supermarkets_japan row
        """
        async with request.app.state.pool.acquire() as conn:
            rows = await conn.fetch(query)
            if not rows:
                return {"type": "FeatureCollection", "features": []}

            features = []
            for r in rows:
                geojson = r["geojson"]
                if geojson:
                    features.append(json.loads(geojson))

            return {"type": "FeatureCollection", "features": features}

    async def get_all_supermarkets_buffer(self, meter: int, request: Request):
        """
        すべてのスーパーマーケットを指定半径(m)のバッファ付きで取得
        """
        query = """
        SELECT jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(ST_Buffer(geometry::geography, $1)::geometry)::jsonb,
            'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM supermarkets_japan row
        """
        async with request.app.state.pool.acquire() as conn:
            rows = await conn.fetch(query, meter)
            if not rows:
                return {"type": "FeatureCollection", "features": []}

            features = []
            for r in rows:
                geojson = r["geojson"]
                if geojson:
                    features.append(json.loads(geojson))

            return {"type": "FeatureCollection", "features": features}