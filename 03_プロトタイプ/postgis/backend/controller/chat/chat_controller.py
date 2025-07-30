from fastapi import APIRouter, HTTPException
from google import genai
from google.genai import types
from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


router = APIRouter()

client = genai.Client()

# MCP 設定 (一旦コメントアウト)
# from mcp import ClientSession, StdioServerParameters
# from mcp.client.stdio import stdio_client
# server_params = StdioServerParameters(
#     command="uv",  # Executable
#     args=["run", "infrastructure/mcp/chat_repository.py"],
#     env=None,  # Optional environment variables
# )


@router.post("/chat")
async def chat_request(request: ChatRequest):
    try:
        if not request.message:
            raise HTTPException(status_code=400, detail="Message is required")

        # MCPツールに自然言語プロンプトを送信 (一旦コメントアウト)
        # async with stdio_client(server_params) as client:
        #     session = ClientSession(client)
        #     mcp_response = await session.prompt(message)

        # Gemini APIを使用してレスポンスを生成
        response = client.models.generate_content(
            # gemini-2.5-proだと、回答が遅すぎるので一旦flashを使っている
            model="gemini-2.5-flash-preview-05-20",
            config=types.GenerateContentConfig(system_instruction="入力されたデータをわかりやすく説明してください"),
            contents=request.message,
        )

        return {"response": response.text}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
