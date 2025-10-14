from fastapi import APIRouter, Request
from infrastructure.request.cycle.cycle_repository import CycleRepository

router = APIRouter()
cycle_repository = CycleRepository()

@router.get("/hello")
async def get_hello_cycle_port_status(request: Request):
    """ハローサイクリングのステーション情報とステータスをGeoJSON形式で取得"""
    return await cycle_repository.get_hello_cycle_port_status(request)

@router.get("/docomo")
async def get_docomo_bike_share_status(request: Request):
    """ドコモバイクシェアのステーション情報とステータスをGeoJSON形式で取得"""
    return await cycle_repository.get_docomo_bike_share_status(request)