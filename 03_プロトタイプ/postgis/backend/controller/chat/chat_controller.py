from fastapi import APIRouter, HTTPException
from google import genai
from google.genai import types
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


router = APIRouter()

client = genai.Client()

server_params = StdioServerParameters(
    command="python",
    args=["-m", "infrastructure.mcp.chat_repository"],
    env={"PYTHONPATH": "/backend"},
)

@router.post("/chat")
async def chat_request(request: ChatRequest):
    try:
        if not request.message:
            raise HTTPException(status_code=400, detail="Message is required")

        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()

                response = await client.aio.models.generate_content(
                    model="gemini-2.5-flash-preview-05-20",
                    config=types.GenerateContentConfig(
                        system_instruction="ユーザーが鉄道路線の名前（例: 池袋線、山手線）を入力した場合は、 `get_train_line_by_name` ツールを使用してください。",
                        tools=[session],
                    ),
                    contents=request.message,
                )

        return {"response": response.text}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"エラーが発生しました: {str(e)}") from e

