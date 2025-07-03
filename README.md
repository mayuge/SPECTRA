<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=SPECTRA%20PROJECT&fontSize=90&animation=fadeIn&fontAlignY=38&descAlignY=51&descAlign=62"/>

### 主な使用技術

<p>
<img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat">
<img src="https://img.shields.io/badge/-NEXTJS-000000.svg?logo=nextdotjs&style=flat">
<img src="https://img.shields.io/badge/-Maplibre-396CB2.svg?logo=maplibre&style=flat">
<img src="https://img.shields.io/badge/-zustand-000000.svg?logo=zustand&style=flat">
<img src="https://img.shields.io/badge/-axios-5A29E4.svg?logo=axios&style=flat">
  <img src="https://img.shields.io/badge/-cloudflare-F38020.svg?logo=cloudflare&style=flat">
</p>

### 現行システム参考動画

- ![リンク](https://youtu.be/bD8sS1OV2hQ?si=uW0oOqOIoVhTTgVh)

### 現行システムアクセス URL

- ![リンク](https://traffic.quantum-rabbit.net/)

### 全体フォルダ構成

- 01 設計 → 設計資料等保管用
- 02src→ 本番用
- 03 プロトタイプ → 技術検証用
  - deckgl で後継アプリの実装を検証中（2025/05/28）
  - rag 構築による対話型の gis の可能性について模索中

### フォルダ構成は基本的に atomicDesign です。

- atoms と molecules フォルダには汎用的な UI 部品が格納してあり、npm storybook コマンドでご確認いただけます。
- ![アトミックデザインについての記事](https://qiita.com/haykubo/items/5e0c26c0f03ed52e6cdb)
- ![アトミックデザインについてのメモ書き](01_設計/AtomicDesignについて.md)

### システムアーキテクチャは cleanArchitecture、ヘキサゴナルアーキテクチャ使ってます。

- ![アーキテクチャについてのメモ書き](01_設計/ドメイン駆動設計とCleanArchitectureについて.md)
- DDD における UI とそれに付随するアプリケーション層を infrastructure 層と分離するために間に domain で指定したインターフェースを挿入した adapter 層（腐敗防止層）を追加する構成となっている。

### サーバー構成
![](01_設計/image/SPECTRA_サーバー構成.png)
