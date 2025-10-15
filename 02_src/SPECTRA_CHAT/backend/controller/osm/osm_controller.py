from fastapi import APIRouter, Request
from infrastructure.request.osm.osm_repository import OsmRepository
from urllib.parse import unquote

router = APIRouter()
osm_repository = OsmRepository()


@router.get("/osm/query/{query}")
async def get_osm_by_query(query:str,request: Request):
    """OSMoverpassクエリを使ってGeoJSON形式で取得"""
    decoded_query = unquote(query)
    return await osm_repository.get_osm_by_query(decoded_query,request)

@router.get("/osm/grocery")
async def get_osm_grocery(request: Request):
    """スーパーマーケットをGeoJSON形式で取得"""
    return await osm_repository.get_osm_grocery(request)

