from urllib.parse import unquote
from fastapi import APIRouter, Request
from infrastructure.request.geocoding.geocoding_repository import GeocodingRepository

router = APIRouter()
geocoding_repository = GeocodingRepository()

@router.get("/geocoding/{address}")
async def geocode_address(address: str, request: Request):
    """住所や施設を指定して表示"""
    decoded_address = unquote(address)
    return await geocoding_repository.geocode_address(decoded_address, request)


