from fastapi import APIRouter, Request
from urllib.parse import unquote
from infrastructure.database.train.train_repository import TrainRepository

router = APIRouter()
train_repository = TrainRepository()

@router.get("/train/station")
async def get_all_stations(request: Request):
    return await train_repository.get_all_stations(request)

@router.get("/train/station/{station_name}")
async def get_station_by_name(station_name: str, request: Request):
    decoded_name = unquote(station_name)  # ここでデコード
    return await train_repository.get_station_by_name(decoded_name, request)