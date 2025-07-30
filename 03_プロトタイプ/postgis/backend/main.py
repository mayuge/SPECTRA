# main.py

import os

import asyncpg
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controller.chat.chat_controller import router as chat_router
from controller.train.train_controller import router as train_router

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB接続プール
@app.on_event("startup")
async def startup():
    app.state.pool = await asyncpg.create_pool(
        host=os.getenv("PGHOST", "localhost"),
        user=os.getenv("PGUSER", "postgres"),
        password=os.getenv("PGPASSWORD", "password"),
        database=os.getenv("PGDATABASE", "postgres"),
        port=int(os.getenv("PGPORT", 5432)),
    )

@app.on_event("shutdown")
async def shutdown():
    await app.state.pool.close()

@app.get("/")
async def root():
    return {"message": "hello"}

# ルーター登録
app.include_router(train_router)
app.include_router(chat_router)
