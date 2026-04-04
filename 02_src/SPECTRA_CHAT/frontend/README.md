<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=SPECTRA%20CHAT&fontSize=90&animation=fadeIn&fontAlignY=38&descAlignY=51&descAlign=62"/>

## アプリケーション公開URL

https://spectra-chat.com/

## API公開URL

https://api.spectra-chat.com/docs#/default

## typedocから自動生成されたソースコードのマニュアル
https://mayuge.github.io/SPECTRA_CHAT_TYPEDOC/

## 主な使用技術/プラグイン

### フロントエンド

<p>
    <img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat">
    <img src="https://img.shields.io/badge/-Vue-4FC08D.svg?logo=vuedotjs&style=flat">
    <img src="https://img.shields.io/badge/-tailwindCSS-06B6D4.svg?logo=tailwindcss&style=flat">
    <img src="https://img.shields.io/badge/-Maplibre-396CB2.svg?logo=maplibre&style=flat">
    <img src="https://img.shields.io/badge/-axios-5A29E4.svg?logo=axios&style=flat">
    <img src="https://img.shields.io/badge/-pinia-FFD859.svg?logo=pinia&style=flat">
</p>

### バックエンド

<p>
    <img src="https://img.shields.io/badge/-FastAPI-009688.svg?logo=fastapi&style=flat">
    <img src="https://img.shields.io/badge/-PostGIS-4169E1.svg?logo=postgresql&style=flat">
    <img src="https://img.shields.io/badge/-Google Gemini-8E75B2.svg?logo=googlegemini&style=flat">
</p>

### その他プラグイン

<p>
    <img src="https://img.shields.io/badge/-pnpm-F69220.svg?logo=pnpm&style=flat">
    <img src="https://img.shields.io/badge/-prettier-F7B93E.svg?logo=prettier&style=flat">
    <img src="https://img.shields.io/badge/-uv-DE5FE9.svg?logo=uv&style=flat">
</p>

## 環境構築

- ### docker 環境を準備
  [docker 公式スタートガイドページ](https://www.docker.com/get-started/)
- ### node 環境を準備
  - node のバージョン管理は [volta](https://docs.volta.sh/guide/getting-started) がおすすめ。指定バージョンの node 環境、パッケージマネージャーを用意してください

  ```
  node v24.12.0
  ```

  ```
  pnpm v10.22.0
  ```

  - ビルドする際、ファイルの大文字小文字の区別をしっかりと管理しないと表示されない場合があるので注意してください

- ### 初期データ取得

  [こちら](https://drive.google.com/drive/folders/1ASBWmogy64pGH4hvqwTM9xYL0mg-w1hO)から取得したものを`02_src\SPECTRA_CHAT\migration`に配置

- ### env ファイル追加
  - 02_src\SPECTRA_CHAT\backend 直下に`.env`ファイルを追加。このとき、.env ファイルの形式は、`env.txt`を参考にすること。

  ```
  //.envの例
  GEMINI_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  ```

- ### アプリケーションを立ち上げる方法
  - 02_src\SPECTRA_CHAT に移動

  ```
  docker compose up --build
  ```

  ```
  python pipeline.py
  ```

  - 02_src\SPECTRA_CHAT\frontend に移動

  ```
  //package.jsonの中身を適用
  pnpm install
  ```

  ```
  //開発サーバーを立ち上げ
   pnpm run dev
  ```

  ```
  //ローカルネットワーク経由で開発サーバーを確認できます。フロント側の`.env`ファイルを`localhost`から一時的に変更してください。
  pnpm run dev --host
  ```

  [`http://localhost:3000/`](http://localhost:3000/)をブラウザで開く

## ディレクトリ構成

```
.
├── 01_docs //主に資料をここに置く
├── 02_src　//本番プロジェクトをここに置く
│   └── SPECTRA_CHAT //アプリケーションディレクトリ
│       ├── frontend
│       │   ├── src
│       │   │   ├── components
│       │   │   │   ├── atoms //最小単位のUIコンポーネント　htmlのタグと対応　どのページでも使い回す
│       │   │   │   ├── molecules //atomsを組み合わせたもの　どのページでも使い回す
│       │   │   │   ├── organisms　// ページ単位でに管理するUIコンポーネント
│       │   │   │   │   └── homeSite //　【ページ名】Site
│       │   │   │   │       ├── __tests__ //テストコード格納フォルダ use【機能名】App.test.ts
│       │   │   │   │       ├── core　//usecase アプリケーションロジック　use【機能名】App.ts
│       │   │   │   │       └── ui //ロジック(機能)と接続するUI　【ページ名】SiteMain.vue、【機能名】App.vue
│       │   │   │   └── templates　//ロジック接続後のUI　基本的にページを表示するだけ 【ページ名】
│       │   │   ├── domain
│       │   │   │   ├── interfaces　// インターフェイスをまとめて保存
│       │   │   │   ├── types　//型をまとめて保存
│       │   │   │   └── params //固定値をまとめて保存
│       │   │   ├── infrastructure
│       │   │   │   └── stores //状態管理ストア
│       │   │   ├── App.vue // UIのエントリポイント　AtomicDesignのPagesにあたる
│       │   │   ├── main.ts　//ロジックのエントリポイント
│       │   │   └── style.css //CSSのエントリポイント
│       │   ├── public //画像、アイコン、素材を置く
│       │   └── package.json //フロントエンドで使用しているライブラリの管理を行う
│       ├── backend
│       │   ├── main.py //エントリポイント
│       │   ├── controller //httpのエンドポイント兼MCP
│       │   ├── infrastructure　//外部ライブラリを使用したロジックを隔離
│       │   └── domain //抽象基底クラスを保管
│       ├── migration //DBに初期投入するデータを保管
│       ├── pipeline.py //DBに初期投入するスクリプト
│       └── compose.yaml //アプリケーション全体のエントリポイント
└── 03_prototype　//プロトタイププロジェクトをここに置く
```

## アプリケーション全体のアーキテクチャ

- モノリシックなソフトウェア構成
- Docker コンテナごとに分けて実装
- 要素間は port 番号を指定して通信する
- backend は、[`http://localhost:4000/docs`](http://localhost:4000/docs)にてアクセスを swagger で検証できる

![](https://kroki.io/mermaid/svg/eNpLy8kvT85ILCpRCHHhSs7PLcgvTo1-3LTicfPmx80dj5tXPW7e87h57uOmJRARBZukIjuoOr3KxNycWK60ovy8ktS8lGgY43HTZrDitsfNXQphpalgPQX5RSXGBgYGsVxJicnZIOVQGkW1W2JxiWOAJ1yHCVgH0LKS9MziaBDt7hmMrOP9ng4Xp_d7OhUCIHJwnaYmxkZAnZkFqTmZeanRMIZeQSVUCcSoxtW5melFiSWZ-XmPm6c-blr5uHn14-aGp22tj5vbQX5v2v-4adKTHQ3Putc865r6tHXp48aZj5u6HzftfNy0Hhw-04HBEssFCzwFXV07BVhIoAhC_YsiBvUZ3J3IggAQ2Lue)

## フロントエンドのアーキテクチャ

- DI(依存性の注入)によって、依存性逆転の原則を保つ
- usecase（純粋な内部ロジック）と infrastructure（外部ロジック）がインターフェースを介してやり取りを行うことで、内部ロジックをクリーンに保つことができる。
- コメントは TSDOC 方式を推奨
- テストコードには vitest を用いる
- インデントには prettier を、ビルドチェックに eslint を用いる

![](https://kroki.io/mermaid/svg/eNp9Us1O20AQvvspLEscI96AUw7soRISySnqYes6YAkcZDvqJYd4t0TQgkBAAIU_hUZECSUFIdpGtcjDTGzDiVfoeJwgQgh7mp2d72dnJr9U-KIvcttVM2lFUfFMTampVEoNbhrgdYJOLbpvxQl6c4qfFmy-sqhmGb7ntCx78tdAHoD8CcIHeQuyAtIH8QdkE69Y9OSvax8JHJ8sy2kgbqnyJK6UmxSvqdMqyBph_w7qDeuz8krVMXTuGIl0Esf64pwstEHcvC-eQNCB3EWZWFt0QV5RLEH8IhMXxNEdknUnukkXlrlpkZkkpF6sg6yDaCT6SGharmHnuW4krRx1lOByGvvAV5jluNzSDcSwtMmXCgvzLneNebdgGyp4bfBaE60wK29zx7WLulu0k_6MpqhNDWp1FWRrrDWj1TktOL4OjrC4Raj9OJBtdDabycw9lmv9Xh0v0bff4er3qFOPtisoMGdaJkfat70O1upx_7zfE2G5Ob5cWYbhTCnwq2H1GrzLgWHRoz2pgmgOJ7MD3lcQG-BdQNlLM0w81PFWKQ1HrLwYN5FO5PIu-_cnwdVhaTALZbwb7xOInaBz9vBjdYSAvpIqjS8T_jq62w5PjxEXbm1Fe_-ePf8Hkjm6kw==)

## AtomicDesign による UI コンポーネントマネジメント

- コンポーネントを階層的に管理することで、UI の拡張性を高める
- コンポーネントは storybook で管理する

- ![](https://kroki.io/mermaid/svg/eNp9VN1P2lAUf-evaEh8k-x9WUwEXCSZmcnwqfGhQkUSaEkp2YsP3t6pKDLd3PwAnU5R2Jyo8WM6Ef6YQ1t58l_YubctMrMtae490Ht-H-ec28mU-jY2JWm6EA37fILQ1ycEAgFhUFfTyZgQlrPJhCIA_QFGBSg-Data6MzsskN4OpubSGhSZso97xwX_U-yyREYeTAKYxEwzoHis41AQIs8zjuI_nFGLwiDIst-MaENPDTyY5EOrZmrBEjd2poxT5fN4kb7rsjetpuF50Iwp-uq0i9ElExOxy2mKg-NhXEOFBRH1JQcy6VkF4zhIpB9-Q5Iy1xBRctAyl2sl6qW7hdCkhbvF0bUuJQalqW4rHXxQuJrLSEpyWy6By_7zCPJgvGxM1u07-pA1tkJoMdgXAOlYJzgO2sJXVQe9QMtsSIY13b52rxbZQ6rBSu_cn9I7IvdLmtYjMrpTErSPRf24pV1jlBHZmsLyAaQQ08Wkpj5eTAWrXILCCt41xvQeaArrIfGjZk_AHoLdI734Av-vP9asyu_upRD4qiU4HRmfadTKiOXcwLIZzCWENf-dNvZ3kMxQI84yhwY-6yZxikTdtLk2ngV7IUbs15Cd54NVOmhbSKUyyor8Z7p66zttVuGNVN1x2wQ9wEhiFGQRyGMQjwKYxTm0VBP_h-lZ14PealvwDhzAvOsAqSGqhymp9P8Sk0kY6K_FwYzhGcCx_vOLaPZPQ52zO3j_wTovoNqvT-wr0p-p5xjWTkmZWUR9xDubhuBrnLsIpPVw8NJEHid8bhyfwKtIiFKeBwLNS0lFdHZPEh2RVFWi-vDVlUdsxyyxu-a0ye2YlPs5rcuXkSZ1CSRr1ldy8X0nOYpHY5GRxFiRMrgGg7i8kZXNfmvjWs3t83jDaeorA6XBAfGrS5v2DT7BqDMTefqA6maHxpAzs15nIf1aa9Yvm7ZeNK_nOGwOYzTbkF8rpP_Z-E9qe_c78_2ZDFxARRnlS-stdNHHb8BJW2axA==)

## 　バックエンドのアーキテクチャ

- 基本的にはフロントエンドと同じ。
- ruff コマンドを使ってインデントを修正できる

![](https://kroki.io/mermaid/svg/eNp1kUFLAkEYhu_7K4YFj9Y_6JIdunQIO4R02GzNwHZldiUCD-4MktapSEVBwhDUIGMRKmXLH_M1mif_QjM7a7Rqc1h2vvm-d55531TGvEimNWyjeExREF-RCIpGo4i5bXD6rN-YfvZEQR7u7MX3DxMqkC7QAdAS0CegHtAmkLasoHPtzNjIXqpHihyxcsenWMum0YGlJzVL58IJdds0bGxmMjqeeyUgj0BrQoq4Qo28Ae1wNd4598pcCAUrUOD3i94XQUGGgoIMFjjPPk6Pf4M53ThZ4oiZAtHHkL8CgZaBtuQj-AnaRJPrj2-3xR5GbFQRd3FNMgzjyOmEyorurNAApw7kZu0YkLvpa31SHv_LtGuksGbZOJe0c1haFC75NkmLK1x0xZpwN2dqV2e0K_wg70ApR5ned_20mn5FJLdMEyQ_qz5-jcmk0Ann_xs_323l2a0HzoBdjcCp5RfBKH9CWtMVZlxplhaxIs0HziqrD1vf-APYLE8o)

## 開発支援ツール

- frontend ディレクトリに移動

```
 pnpm typedoc
```

- TSDoc 形式で書かれた ts ファイルのコメントが反映される
- [TSDoc 形式とは](https://dev.classmethod.jp/articles/jsdoc-cheatsheet/)
- 自動でドキュメントを生成する
