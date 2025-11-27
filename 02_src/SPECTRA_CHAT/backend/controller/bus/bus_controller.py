from fastapi import APIRouter, Request

from infrastructure.local.bus.bus_repository import BusRepository

router = APIRouter()
bus_repository = BusRepository()

@router.get("/bus/line/tokyo")
def get_bus_line_tokyo(request: Request):
    """都営バスの路線情報を取得します。"""
    return bus_repository.get_bus_line_tokyo(request)

@router.get("/bus/stop/tokyo")
def get_bus_stop_tokyo(request: Request):
    """都営バスのバス停情報を取得します。"""
    return bus_repository.get_bus_stop_tokyo(request)