import os

from fastapi import APIRouter, Request
from google import generativeai as genai
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

router = APIRouter()

# Google Generative AI の初期化
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# MCP 設定
server_params = StdioServerParameters(
    command="uv",  # Executable
    args=["run", "infrastructure/mcp/chat_repository.py"],
    env=None,  # Optional environment variables
)


@router.post("/chat")
async def chat_request(request: Request):
    body = await request.json()
    message = body.get("message")

    # MCPツールに自然言語プロンプトを送信
    async with stdio_client(server_params) as client:
        session = ClientSession(client)
        mcp_response = await session.prompt(message)

    # Gemini に応答の自然な説明を依頼（必要に応じて）
    model = genai.GenerativeModel("gemini-pro")
    gemini_response = model.generate_content(f"以下のデータをわかりやすく説明してください：\n{mcp_response}")
    explanation = gemini_response.text

    return {"tool_result": mcp_response, "gemini_summary": explanation}
