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

# MCP 設定
server_params = StdioServerParameters(
    command="npx",
    args=["-y", "@philschmid/weather-mcp"],
    env=None,
)


@router.post("/chat")
async def chat_request(request: ChatRequest):
    try:
        if not request.message:
            raise HTTPException(status_code=400, detail="Message is required")

        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()

                # Gemini APIを使用してレスポンスを生成
                response = await client.aio.models.generate_content(
                    # gemini-2.5-proだと、回答が遅すぎるので一旦flashを使う
                    model="gemini-2.5-flash-preview-05-20",
                    config=types.GenerateContentConfig(
                        system_instruction="天気について質問されたら、weather-mcpを使用して回答してください",
                        tools=[session],
                    ),
                    contents=request.message,
                )

        return {"response": response.text}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"エラーが発生しました: {str(e)}")
