FROM python:3.11-slim

# uvをインストール
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# 作業ディレクトリを /backend に変更
WORKDIR /backend

# 依存関係をインストール
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project

# プロジェクトをコピー
ADD . /backend

# プロジェクトを同期
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked

# アプリケーションの起動コマンド
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4000"]
