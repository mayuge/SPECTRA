from fastapi import FastAPI
import asyncpg
import os
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import unquote
from fastapi import HTTPException

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
async def startup():
    app.state.pool = await asyncpg.create_pool(
        host=os.getenv("PGHOST", "localhost"),
        user=os.getenv("PGUSER", "postgres"),
        password=os.getenv("PGPASSWORD", "password"),
        database=os.getenv("PGDATABASE", "postgres"),
        port=int(os.getenv("PGPORT", 5432)),
    )

@app.on_event("shutdown")
async def shutdown():
    await app.state.pool.close()

@app.get("/")
async def root():
    return {"message": "Welcome to the Train Info API"}

@app.get("/train/station")
async def get_all_stations():
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
    async with app.state.pool.acquire() as conn:
        result = await conn.fetchrow(query)
        return result["geojson"]



@app.get("/train/station/{station_name}")
async def get_station_by_name(station_name: str):
    decoded_name = unquote(station_name)  # ここで定義！
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
        async with app.state.pool.acquire() as conn:
            result = await conn.fetchrow(query, decoded_name)
            if result:
                return result["geojson"]
            raise HTTPException(status_code=404, detail="Station not found")
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")