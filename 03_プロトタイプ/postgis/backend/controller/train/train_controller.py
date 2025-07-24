# controller/train/train_controller.py

from fastapi import APIRouter, Request, HTTPException
from urllib.parse import unquote

router = APIRouter()

@router.get("/train/station")
async def get_all_stations(request: Request):
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

@router.get("/train/station/{station_name}")
async def get_station_by_name(station_name: str, request: Request):
    decoded_name = unquote(station_name)
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
    try:
        async with request.app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query, decoded_name)
            if result:
                return result["geojson"]
            raise HTTPException(status_code=404, detail="Station not found")
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
