import json

from fastapi import HTTPException, Request

class SchoolRepository:
    #すべての学校を取得
    async def get_all_schools(self, request: Request):
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

    #すべての小学校（P29_003が16001）を取得
    async def get_all_elementary_schools(self, request: Request):
        query = """
        SELECT jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geometry)::jsonb,
            'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM p29_23 row
        WHERE "p29_003" = '16001'
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
        
    #すべての中学校・中等教育学校（P29_003が16002　または　16003）を取得
    async def get_all_junior_high_schools(self, request: Request):
        query = """
        SELECT jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geometry)::jsonb,
            'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM p29_23 row
        WHERE "p29_003" IN ('16002', '16003')
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
    
    #すべての高校（P29_003が16004　または　16005）を取得
    async def get_all_high_schools(self, request: Request):
        query = """
        SELECT jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geometry)::jsonb,
            'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM p29_23 row
        WHERE "p29_003" IN ('16004', '16005')
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
        
    #すべての幼稚園または幼保連携型認定こども園（P29_003が16006　または　16007）を取得
    async def get_all_kindergartens(self, request: Request):
        query = """
        SELECT jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geometry)::jsonb,
            'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM p29_23 row
        WHERE "p29_003" IN ('16006', '16007')
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