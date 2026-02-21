from fastapi import APIRouter, Request
from infrastructure.database.school.school_repository import SchoolRepository

router = APIRouter()
school_repository = SchoolRepository()

@router.get("/school")
async def get_all_schools(request: Request):
    """すべての学校情報を取得します。"""
    return await school_repository.get_all_schools(request)

@router.get("/school/elementary")
async def get_all_elementary_schools(request: Request):
    """すべての小学校情報を取得します。"""
    return await school_repository.get_all_elementary_schools(request)

@router.get("/school/junior_high")
async def get_all_junior_high_schools(request: Request):
    """すべての中学校・中等教育学校情報を取得します。"""
    return await school_repository.get_all_junior_high_schools(request)

@router.get("/school/high")
async def get_all_high_schools(request: Request):
    """すべての高等学校・高等専門学校情報を取得します。"""
    return await school_repository.get_all_high_schools(request)


@router.get("/school/kindergarten")
async def get_all_kindergarten(request: Request):
    """すべての幼稚園または幼保連携型認定こども園情報を取得します。"""
    return await school_repository.get_all_kindergartens(request)