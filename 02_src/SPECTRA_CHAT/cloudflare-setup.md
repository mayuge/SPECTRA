# Cloudflare Tunnel 設定まとめ

このプロジェクトで行った Cloudflare Tunnel の構成をまとめたドキュメントです。

## 1. 目的

- `spectra-chat.com` からフロントエンドを公開
- `api.spectra-chat.com` からバックエンド API を公開
- 自宅やローカル PC 上の Docker コンテナを Cloudflare トンネル経由で HTTPS 公開する

## 2. 使っているファイル

- `compose.yaml`
- `cloudflared/config.yml`
- `.env`

## 3. `compose.yaml` の設定

`02_src/SPECTRA_CHAT/compose.yaml` では `cloudflared` サービスを追加しています。

### Cloudflared サービス

- イメージ: `cloudflare/cloudflared:latest`
- コマンド:
  - `tunnel --no-autoupdate --config /etc/cloudflared/config.yml run --token ${CLOUDFLARED_TOKEN}`
- 環境変数:
  - `CLOUDFLARED_TOKEN=${CLOUDFLARED_TOKEN}`
- マウント:
  - `./cloudflared/config.yml:/etc/cloudflared/config.yml:ro`
- 依存先:
  - `frontend`
  - `backend`

### フロントエンドサービス

- イメージ: `nginx:alpine`
- ポート: `3000:80`
- ボリューム: `./frontend/dist:/usr/share/nginx/html`

### バックエンドサービス

- `uvicorn` で起動
- ホスト: `0.0.0.0`
- ポート: `4000`

## 4. `cloudflared/config.yml` の設定

`02_src/SPECTRA_CHAT/cloudflared/config.yml` の ingress 設定は以下の通りです。

```yaml
ingress:
  - hostname: spectra-chat.com
    service: http://frontend:80
  - hostname: api.spectra-chat.com
    service: http://backend:4000
  - service: http_status:404
```

### 役割

- `spectra-chat.com` へのアクセスは Docker 内の `frontend` コンテナの `80` 番ポートへ転送
- `api.spectra-chat.com` へのアクセスは Docker 内の `backend` コンテナの `4000` 番ポートへ転送
- マッチしないリクエストは `404` を返す

## 5. `.env` の設定

`02_src/SPECTRA_CHAT/.env` には Cloudflare Tunnel のトークンを定義しています。

```env
CLOUDFLARED_TOKEN=...your token...
```

- `compose.yaml` からこのトークンが読み込まれ、`cloudflared` コンテナ起動時に使用されます
- 実運用では `CLOUDFLARED_TOKEN` を漏洩しないように管理してください

## 6. 連携まとめ

- `docker compose up -d` で `frontend` / `backend` / `postgis` / `cloudflared` を起動
- `cloudflared` が `frontend` と `backend` を Cloudflare ドメインに公開
- Cloudflare 側では `spectra-chat.com` と `api.spectra-chat.com` の DNS が Cloudflare トンネルに向くようになっている想定

## 7. 注意点

- `cloudflared` コンテナは `frontend` と `backend` に依存しているため、先にこれらが起動している必要があります
- `frontend` は `nginx` で `./frontend/dist` を公開するため、事前にビルド済みである必要があります
- `backend` は `uvicorn` が `4000` で起動する前提

## 8. 今後の改善候補

- `cloudflared` の `config.yml` に複数ホストやサブドメインを追加する
- `tunnel` を名前付きで管理し、トークンではなく `credentials-file` 方式に切り替える
- Cloudflare Access / Zero Trust を使って社内限定アクセスを追加する
