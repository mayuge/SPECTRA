from urllib.parse import unquote
from fastapi import APIRouter, Request
from infrastructure.database.city.city_repository import CityRepository

router = APIRouter()
city_repository = CityRepository()

# 市区町村名で検索
@router.get("/city/{city_name}")
async def get_city_by_name(city_name: str, request: Request):
    """
    市区町村の名前を指定して市区町村を表示
    例: 'さいたま市', '千葉市'
    """
    decoded_name = unquote(city_name)
    print(f"Received city_name: {decoded_name}")
    return await city_repository.get_city_by_name(decoded_name, request)

#市区町村名を基準に他のデータを取得したい場合
@router.get("/city/{city_name}/overlaps/{table_name}",operation_id="getCityOverlapsByTable",tags=["city"])
async def get_city_overlaps_by_table(city_name: str, table_name: str, request: Request):
    """
    市区町村を基準にして、地理的に重なっているデータを選んで取得する
    チャットの例:'横浜市にある駅を取得'

    地価データのテーブル名は、l02_25
    スーパーマーケットのテーブル名は、supermarkets_japan
    駅のテーブル名は、unkohonsu2024_rosen_eki
    鉄道路線のテーブル名は、unkohonsu2024_rosen_kukan
    学校のテーブル名は、p29_23 
    """
    city_name = unquote(city_name)
    table_name = unquote(table_name)
    return await city_repository.get_overlaps_by_table(
        city_name,
        table_name,
        request
    )

#　都道府県名で取得
@router.get("/prefecture/{prefecture_name}")
async def get_prefecture_by_name(prefecture_name: str, request: Request):
    """
    都道府県の名前を指定して都道府県を表示
    例: '埼玉県', '千葉県'
    """
    decoded_name = unquote(prefecture_name)
    print(f"Received prefecture_name: {decoded_name}")
    return await city_repository.get_prefecture_by_name(decoded_name, request)
