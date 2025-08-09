from fastapi import APIRouter, HTTPException
from google import genai
from google.genai import types
from mcp import ClientSession
from mcp.client.sse import sse_client
from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


router = APIRouter()

client = genai.Client()

MCP_SERVER_URL = "http://localhost:4000/mcp"


# @router.post("/chat")
# async def chat_request(request: ChatRequest):
#     try:
#         if not request.message:
#             raise HTTPException(status_code=400, detail="Message is required")

#         async with sse_client(MCP_SERVER_URL) as (read, write):
#             async with ClientSession(read, write) as session:
#                 await session.initialize()

#                 response = await client.aio.models.generate_content(
#                     model="gemini-2.5-flash",
#                     config=types.GenerateContentConfig(
#                         system_instruction=(
#                             "ユーザーが鉄道路線の名前（例: 池袋線、山手線）を入力した場合、"
#                             "`get_line_by_name` ツールを必ず使用してください。"
#                             "ユーザーが駅の名前（例: 東京、池袋）を入力した場合、"
#                             "`get_station_by_name` ツールを必ず使用してください。"
#                             "ツールから返された結果をそのまま返答として使ってください。"
#                         ),
#                         tools=[session],
#                     ),
#                     contents=request.message,
#                 )

#         return {"response": response.text}

#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"エラーが発生しました: {str(e)}") from e

@router.post("/chat")
async def chat_request(request: ChatRequest):
    if not request.message:
        raise HTTPException(status_code=400, detail="Message is required")

    async with sse_client(MCP_SERVER_URL) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # AIに「路線か駅か判定してURLを返すだけ」を指示
            response = await client.aio.models.generate_content(
                model="gemini-2.5-flash",
                config=types.GenerateContentConfig(
                    system_instruction=(
                        "ユーザーの入力が鉄道路線名か駅名かを判別してください。"
                        "路線名なら train/line/{line_name} の形式でURLを返し、"
                        "駅名なら train/station/{station_name} の形式でURLを返してください。"
                        "他の余計な情報は返さないでください。"
                    ),
                    tools=[session],
                ),
                contents=request.message,
            )

    return {response.text.strip()}