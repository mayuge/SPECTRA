from fastapi import APIRouter, Request
from infrastructure.database.school.school_repository import SchoolRepository

router = APIRouter()
school_repository = SchoolRepository()

@router.get("/school")
async def get_all_school(request: Request):
    """すべての学校情報を取得します。"""
    return await school_repository.get_all_school(request)