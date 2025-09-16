from urllib.parse import unquote
from fastapi import APIRouter, Request
from infrastructure.database.city.city_repository import CityRepository

router = APIRouter()
city_repository = CityRepository()

# 市区町村名で検索
@router.get("/city/{city_name}")
async def get_city_by_name(city_name: str, request: Request):
    """
    市区町村の名前を指定して市区町村を取得します。
    例: 'さいたま市', '千葉市'
    """
    decoded_name = unquote(city_name)
    return await city_repository.get_city_by_name(decoded_name, request)
