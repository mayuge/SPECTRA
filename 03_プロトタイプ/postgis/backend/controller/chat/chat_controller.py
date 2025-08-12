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


@router.post("/chat")
async def chat_request(request: ChatRequest):
    try:
        if not request.message:
            raise HTTPException(status_code=400, detail="Message is required")

        async with sse_client(MCP_SERVER_URL) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()

                response = await client.aio.models.generate_content(
                    model="gemini-2.5-flash",
                    config=types.GenerateContentConfig(
                        system_instruction=(
                            "ユーザーが鉄道路線の名前（例: 池袋線、山手線）を入力した場合、"
                            "`get_line_by_name` ツールを必ず使用してください。"
                            "ユーザーが駅の名前（例: 東京、池袋）を入力した場合、"
                            "`get_station_by_name` ツールを必ず使用してください。"
                            "ツールから返された結果をそのまま返答として使ってください。"
                        ),
                        tools=[session],
                        automatic_function_calling=genai.types.AutomaticFunctionCallingConfig(disable=True),
                    ),
                    contents=request.message,
                )
                try:
                    part = response.candidates[0].content.parts[0]
                except Exception:
                    part = None

                if part and hasattr(part, "function_call") and part.function_call:
                    fn = part.function_call.name
                    args = dict(part.function_call.args or {})

                    # MCPツールを実行
                    tool_result = await session.call_tool(fn, args)

                    return {"response": str(tool_result.content[0].text)}

        return {"response": response.text}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"エラーが発生しました: {str(e)}") from e
