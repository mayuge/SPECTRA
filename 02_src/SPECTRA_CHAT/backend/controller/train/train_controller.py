from urllib.parse import unquote

from fastapi import APIRouter, Request

from infrastructure.database.train.train_repository import TrainRepository

router = APIRouter()
train_repository = TrainRepository()


@router.get("/train/station")
async def get_all_stations(request: Request):
    """全ての駅情報を取得します。"""
    return await train_repository.get_all_stations(request)

@router.get("/train/station/buffer/{meter}")
async def get_all_stations_buffer(meter: int, request: Request):
    """駅の半径メートル圏内を取得します。単位がkmのときはmeterに1000をかけた値を入れてください。"""
    return await train_repository.get_all_stations_buffer(meter, request)

@router.get("/train/station/{station_name}")
async def get_station_by_name(station_name: str, request: Request):
    """駅名を指定して駅情報を取得します。最後の文字が駅だった場合は引数に入れない。引数の例: '東京', '池袋'"""
    decoded_name = unquote(station_name)
    return await train_repository.get_station_by_name(decoded_name, request)

@router.get("/train/station/frequency/{frequency}")
async def get_all_stations_by_frequency(frequency: int, request: Request):
    """指定した運行本数より多い駅情報をすべて取得します。引数の例: 10, 50, 100"""
    return await train_repository.get_all_stations_by_frequency(frequency, request)

@router.get("/train/line")
async def get_all_lines(request: Request):
    """全ての路線情報を取得します。"""
    return await train_repository.get_all_lines(request)

@router.get("/train/line/{line_name}")
async def get_line_by_name(line_name: str, request: Request):
    """路線名を指定して路線情報を取得します。引数の例: '池袋線', '山手線'"""
    decoded_name = unquote(line_name)
    return await train_repository.get_line_by_name(decoded_name, request)

@router.get("/train/line/frequency/{frequency}")
async def get_all_lines_by_frequency(frequency: int, request: Request):
    """指定した運行本数より多い路線情報をすべて取得します。引数の例: 10, 50, 100"""
    return await train_repository.get_all_lines_by_frequency(frequency, request)