FROM python:3.11-slim

# 作業ディレクトリを /backend に変更
WORKDIR /backend

# ホストの backend/requirements.txt をコンテナの /backend にコピー
COPY requirements.txt ./

# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードを全て /backend にコピー
COPY . .

# アプリケーションの起動コマンド
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4000"]
