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
                        system_instruction=(
                            "ユーザーが鉄道路線の名前（例: 池袋線、山手線）を入力した場合、"
                            "`get_train_line_by_name` ツールを必ず使用してください。"
                            "ユーザーが駅の名前（例: 東京、池袋）を入力した場合、"
                            "`get_station_by_name` ツールを必ず使用してください。"
                            "ツールから返された結果をそのまま返答として使ってください。"
                        ),
                        tools=[session],
                    ),
                    contents=request.message,
                )

        # response.candidates から functionResponse を探す
        for candidate in response.candidates or []:
            parts = candidate.content.parts if candidate.content else []
            for part in parts:
                # MCPの返り値を取り出す
                fr = getattr(part, "functionResponse", None)
                if fr and fr.response:
                    result = fr.response.result
                    contents = result.get("content", [])
                    for item in contents:
                        if item.get("type") == "text":
                            return {"response": item["text"]}

        # fallback: モデル自身の応答があれば返す
        fallback_texts = [
            part.text for candidate in response.candidates or []
            for part in (candidate.content.parts if candidate.content else [])
            if hasattr(part, "text") and part.text
        ]
        if fallback_texts:
            return {"response": fallback_texts[0]}

        raise HTTPException(status_code=500, detail="返答がありません")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"エラーが発生しました: {str(e)}") from e
