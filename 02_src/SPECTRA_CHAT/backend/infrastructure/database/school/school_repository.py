import json

from fastapi import HTTPException, Request

class SchoolRepository:
    async def get_all_school(self, request: Request):
        query = """
        SELECT jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geometry)::jsonb,
            'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM p29_23 row
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
