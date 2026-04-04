import json

from fastapi import HTTPException, Request


class TrainRepository:
    async def get_all_stations_by_frequency(self, frequency: int, request: Request):
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
        FROM (
          SELECT *
          FROM unkohonsu2025_rosen_eki
          WHERE COALESCE("発数1",0) + COALESCE("発数2",0) + COALESCE("着数1",0) + COALESCE("着数2",0) >= $1
        ) row
        """
        async with request.app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query, frequency)
            geojson = result["geojson"]
            if isinstance(geojson, str):
                geojson = json.loads(geojson)
            return geojson
        
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
        FROM (SELECT * FROM unkohonsu2025_rosen_eki) row
        """
        async with request.app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query)
            geojson = result["geojson"]
            if isinstance(geojson, str):
                geojson = json.loads(geojson)
            return geojson  # ← dictで返す

    async def get_all_stations_buffer(self, meter: int, request: Request):
      """すべての駅を指定半径のバッファ付きGeoJSONで返す"""
      query = """
      SELECT jsonb_build_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(ST_Buffer(geometry::geography, $1)::geometry)::jsonb,
          'properties', to_jsonb(row) - 'geometry'
      ) AS geojson
      FROM unkohonsu2025_rosen_eki row
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
        
    async def get_station_by_name(self, station_name: str, request: Request):
        query = """
        SELECT jsonb_build_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(geometry)::jsonb,
          'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM unkohonsu2025_rosen_eki row
        WHERE "駅名" = $1
        LIMIT 10
        """
        async with request.app.state.pool.acquire() as conn:
              result = await conn.fetchrow(query, station_name)
              if result:
                  # 🔑 文字列 → Pythonオブジェクトに変換
                  return json.loads(result["geojson"])
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
        FROM (SELECT * FROM unkohonsu2025_rosen_kukan) row
        """
        async with request.app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query)
            geojson = result["geojson"]
            if isinstance(geojson, str):
                geojson = json.loads(geojson)
            return geojson  # ← dictで返す

    async def get_line_by_name(self, line_name: str, request: Request):
        query = """
        SELECT jsonb_build_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(geometry)::jsonb,
          'properties', to_jsonb(row) - 'geometry'
        ) AS geojson
        FROM unkohonsu2025_rosen_kukan row
        WHERE "路線名" = $1
        """
        async with request.app.state.pool.acquire() as conn:
            rows = await conn.fetch(query, line_name)
            if not rows:
                raise HTTPException(status_code=404, detail=f"Line not found: {line_name}")

            # 🔑 ここで json.loads して「文字列 → オブジェクト」に変換
            features = [json.loads(r["geojson"]) for r in rows]

            return {"type": "FeatureCollection", "features": features}
      
    async def get_all_lines_by_frequency(self, frequency: int, request: Request):
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
        FROM (
          SELECT *
          FROM unkohonsu2025_rosen_kukan
          WHERE COALESCE("逆方向運行本数2025",0) + COALESCE("順方向運行本数2025",0) >= $1
        ) row
        """
        async with request.app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query, frequency)
            geojson = result["geojson"]
            if isinstance(geojson, str):
                geojson = json.loads(geojson)
            return geojson
