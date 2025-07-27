from fastapi import APIRouter, Request
#from infrastructure.mcp.chat_repository import ChatRepository

router = APIRouter()
#chat_repository = ChatRepository()

@router.post("/chat")
async def chat_request(request: Request):
    body = await request.json()  # JSONを直接取得
    message = body.get("message")

    if not message:
        return {"error": "message is required"}
    return {"message": message}
