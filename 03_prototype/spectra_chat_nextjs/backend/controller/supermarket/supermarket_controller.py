from fastapi import APIRouter, Request
from infrastructure.database.supermarket.supermarket_repository import SupermarketRepository

router = APIRouter()
supermarket_repository = SupermarketRepository()

@router.get("/supermarket")
async def get_all_supermarkets(request: Request):
    """すべてのスーパーマーケットを表示"""
    return await supermarket_repository.get_all_supermarkets(request)

@router.get("/supermarket/buffer/{meter}")
async def get_all_supermarkets_buffer(meter: int, request: Request):
    """スーパーマーケットの半径メートル圏内を表示 単位がkmのときはmeterに1000をかけた値を入れてください。単位が徒歩の場合は80をかけた値を入れてください。"""
    return await supermarket_repository.get_all_supermarkets_buffer(meter, request)
