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
<img src="https://img.shields.io/badge/-Google Gemini-8E75B2.svg?logo=googlegemini&style=flat">
</p>

## アプリケーション全体のアーキテクチャ

- モノリシックなソフトウェア構成
- 要素間は port 番号を指定して通信する

```mermaid
flowchart TD
compose[エントリーポイント <br>compose.yaml]
frontend[frontendコンテナ Vue <br>port3000]
backend[backendコンテナ FastAPI <br>port4000]
postgis[postGISコンテナ（DB） FastAPI <br>port5432]
pipeline[pipeline.py <br>postGISにmigrationフォルダ内データを一括投入するスクリプト]

compose --> frontend
compose --> backend
compose --> postgis
pipeline --> postgis
```

## フロントエンドのアーキテクチャ

- DI(依存性の注入)によって、依存性逆転の原則を保つ
- usecase（純粋な内部ロジック）と infrastructure（外部ロジック）がインターフェースを介してやり取りを行うことで、内部ロジックをクリーンに保つことができる。

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
