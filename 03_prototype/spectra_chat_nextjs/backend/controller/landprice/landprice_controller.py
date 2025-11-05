from fastapi import APIRouter, Request
from infrastructure.database.landprice.landprice_repository import LandpriceRepository

router = APIRouter()
landprice_repository = LandpriceRepository()

@router.get("/landprice")
async def get_all_landprice(request: Request):
    """すべての地価を取得します。"""
    return await landprice_repository.get_all_landprice(request)


