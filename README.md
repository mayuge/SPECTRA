<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=SPECTRA%20CHAT&fontSize=90&animation=fadeIn&fontAlignY=38&descAlignY=51&descAlign=62"/>

## 主な使用技術

<p>
    <img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat">
    <img src="https://img.shields.io/badge/-Vue-4FC08D.svg?logo=vuedotjs&style=flat">
    <img src="https://img.shields.io/badge/-tailwindCSS-06B6D4.svg?logo=tailwindcss&style=flat">
    <img src="https://img.shields.io/badge/-Maplibre-396CB2.svg?logo=maplibre&style=flat">
    <img src="https://img.shields.io/badge/-axios-5A29E4.svg?logo=axios&style=flat">
    <img src="https://img.shields.io/badge/-pinia-FFD859.svg?logo=pinia&style=flat">
    <img src="https://img.shields.io/badge/-FastAPI-009688.svg?logo=fastapi&style=flat">
    <img src="https://img.shields.io/badge/-PostGIS-4169E1.svg?logo=postgresql&style=flat">
    <img src="https://img.shields.io/badge/-Google Gemini-8E75B2.svg?logo=googlegemini&style=flat">
</p>

## 環境構築

- ### docker 環境を準備
  [docker 公式スタートガイドページ](https://www.docker.com/get-started/)
- ### node 環境を準備

  - node のバージョン管理は [volta](https://docs.volta.sh/guide/getting-started) がおすすめ。指定バージョンの node 環境、パッケージマネージャーを用意してください

  ```
  node v22.21.0
  ```

  ```
  pnpm v10.22.0
  ```

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

```mermaid
flowchart TD
compose[エントリーポイント <br>compose.yaml]
frontend[frontendコンテナ Vue <br>port3000]
backend[backendコンテナ FastAPI <br>port4000]
postgis[postGISコンテナ（DB） PostGIS <br>port5432]
pipeline[pipeline.py <br>postGISにmigrationフォルダ内データを一括投入するスクリプト]

compose --> frontend
compose --> backend
compose --> postgis
pipeline --> postgis
```

## フロントエンドのアーキテクチャ

- DI(依存性の注入)によって、依存性逆転の原則を保つ
- usecase（純粋な内部ロジック）と infrastructure（外部ロジック）がインターフェースを介してやり取りを行うことで、内部ロジックをクリーンに保つことができる。
- コメントは TSDOC 方式を推奨
- テストコードには vitest を用いる
- インデントには prettier を、ビルドチェックに eslint を用いる

```mermaid
flowchart TD

    %% --- 層の定義 ---
    subgraph UI層["UI（プレゼンテーション層）"]
        UI["コンポーネント / ページ"]
    end

    subgraph Usecase層["Usecase（アプリケーション層）"]
        Usecase["ビジネスロジック / ユースケース"]
    end

    subgraph Domain層["Domain（ドメイン層 / interface定義）"]
        Domain["IMapInstance / IDialogStateStore など"]
    end

    subgraph Infrastructure層["Infrastructure（インフラ層）"]
        Infrastructure["地図ライブラリ / HTTP通信 / 状態管理（Pinia）など"]
    end

    %% --- 関係性の定義 ---
    UI -->|引数にインターフェースをいれて、DIを行う| Usecase
    Usecase -->|インターフェースに依存| Domain
    Infrastructure -->|インターフェースを実装| Domain
    UI ---|ユースケースの結果を描画| Usecase
```

## AtomicDesign による UI コンポーネントマネジメント

- コンポーネントを階層的に管理することで、UI の拡張性を高める
- コンポーネントは storybook で管理する

```mermaid
flowchart TD

  %% --- Atomic Design レイヤー構造 ---
  subgraph AtomicDesign["Atomic Design によるUIコンポーネント構造"]

    A[Atom<br>（UI部品の最小単位<br>例: Button, Input, Icon）]
    B[Molecule<br>（Atomの組み合わせ<br>例: Form, Card, ModalHeader）]
    C[Organism<br>（Atoms/Moleculesを配置し<br>ロジックを持つ単位<br>ページ相当の構成要素）]
    D[Template<br>（状況に応じてOrganismを切り替える<br>例: デバイス別・テーマ別表示）]
    E[Page<br>実際に表示される画面（ルーティングに対応し<br>特定のTemplateを表示する）]
  end

  %% --- 関係性 ---
  A --> B
  B --> C
  C --> D
  D --> E

  %% --- ロジック・ユースケース層との関係 ---
  subgraph Logic["ロジック層 / クリーンアーキテクチャとの接続"]
    Usecase[UseCase<br>（ビジネスロジック / アプリケーション層）]
    Domain[Domain<br>（インターフェース / エンティティ定義）]
    Infra[Infrastructure<br>（HTTP / Map / DB / Store）]
  end

  %% --- 依存関係の流れ ---
  C -->|UIイベントで呼び出し| Usecase
  Usecase -->|インターフェースに依存| Domain
  Infra -->|インターフェースを実装| Domain
  C ---|UI更新| Usecase

```

## 　バックエンドのアーキテクチャ

- 基本的にはフロントエンドと同じ。
- ruff コマンドを使ってインデントを修正できる

```mermaid
flowchart TD

    %% --- 層の定義 ---

    ENTRY["エントリーポイント main.py"]


    subgraph Usecase層["Controller（アプリケーション層）"]
        Usecase["リクエストコントローラー"]
    end

    subgraph Domain層["Domain（ドメイン層 / 抽象基底クラス）"]
        Domain["共通する抽象基底クラスを継承"]
    end

    subgraph Infrastructure層["Infrastructure（インフラ層）"]
        Infrastructure["外部ロジック用リポジトリ"]
    end

    %% --- 関係性の定義 ---
    ENTRY -->|呼び出し| Usecase
    Usecase -->|呼び出し| Infrastructure
    Usecase -->|継承元| Domain
    Infrastructure -->|継承元| Domain
```
