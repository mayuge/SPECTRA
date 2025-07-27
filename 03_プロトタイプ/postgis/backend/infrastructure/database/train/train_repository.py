from fastapi import Request, HTTPException

class TrainRepository:
    async def get_all_stations(self, request: Request):
        query = """
        SELECT jsonb_build_object(
          'type', 'FeatureCollection',
          'features', jsonb_agg(
            jsonb_build_object(
              'type', 'Feature',
              'geometry', ST_AsGeoJSON(geometry)::jsonb,
              'properties', to_jsonb(row) - 'geometry'
            )
          )
        ) AS geojson
        FROM (SELECT * FROM n05_23_station2) row
        """
        async with request.app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query)
            return result["geojson"]

    async def get_station_by_name(self, station_name: str, request: Request):
        query = """
        SELECT jsonb_build_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(geometry)::jsonb,
          'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM n05_23_station2 row
        WHERE "n05_011" = $1
        LIMIT 10
        """
        async with request.app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query, station_name)
            if result:
                return result["geojson"]
            raise HTTPException(status_code=404, detail="Station not found")
        
    async def get_all_lines(self, request: Request):
        query = """
        SELECT jsonb_build_object(
          'type', 'FeatureCollection',
          'features', jsonb_agg(
            jsonb_build_object(
              'type', 'Feature',
              'geometry', ST_AsGeoJSON(geometry)::jsonb,
              'properties', to_jsonb(row) - 'geometry'
            )
          )
        ) AS geojson
        FROM (SELECT * FROM n05_23_railroadsection2) row
        """
        async with request.app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query)
            return result["geojson"]
        
    async def get_line_by_name(self, line_name: str, request: Request):
        query = """
        SELECT jsonb_build_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(geometry)::jsonb,
          'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM n05_23_railroadsection2 row
        WHERE "N05_002" = $1
        LIMIT 10
        """
        async with request.app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query, line_name)
            if result:
                return result["geojson"]
            raise HTTPException(status_code=404, detail="Line not found")
