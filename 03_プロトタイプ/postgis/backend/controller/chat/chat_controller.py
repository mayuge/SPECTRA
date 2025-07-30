import os

from fastapi import APIRouter, Request, HTTPException
from google import genai
from google.genai import types

router = APIRouter()

# Gemini API クライアントの初期化
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# MCP 設定 (コメントアウト)
# from mcp import ClientSession, StdioServerParameters
# from mcp.client.stdio import stdio_client
# server_params = StdioServerParameters(
#     command="uv",  # Executable
#     args=["run", "infrastructure/mcp/chat_repository.py"],
#     env=None,  # Optional environment variables
# )


@router.post("/chat")
async def chat_request(request: Request):
    try:
        # APIキーのチェック
        if not os.getenv("GEMINI_API_KEY"):
            raise HTTPException(status_code=500, detail="Gemini API key is not configured")
        
        body = await request.json()
        message = body.get("message")
        
        if not message:
            raise HTTPException(status_code=400, detail="Message is required")
        
        # MCPツールに自然言語プロンプトを送信 (コメントアウト)
        # async with stdio_client(server_params) as client:
        #     session = ClientSession(client)
        #     mcp_response = await session.prompt(message)
        
        # Gemini APIを使用してレスポンスを生成
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            config=types.GenerateContentConfig(
                system_instruction="以下のデータをわかりやすく説明してください"
            ),
            contents=message
        )
        
        return {"response": response.text}
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
