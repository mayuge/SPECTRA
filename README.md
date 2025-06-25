<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=SPECTRA%20PROJECT&fontSize=90&animation=fadeIn&fontAlignY=38&descAlignY=51&descAlign=62"/>

### 現行システム参考動画
- ![リンク](https://youtu.be/bD8sS1OV2hQ?si=uW0oOqOIoVhTTgVh)

### 現行システムアクセスURL
- ![リンク](https://traffic.quantum-rabbit.net/)

### 全体フォルダ構成
- 01設計→設計資料等保管用
- 02src→本番用
- 03プロトタイプ→技術検証用
  - deckglで後継アプリの実装を検証中（2025/05/28）

### フォルダ構成は基本的にatomicDesignです。
  - atomsとmoleculesフォルダには汎用的なUI部品が格納してあり、npm storybookコマンドでご確認いただけます。
  - ![アトミックデザインについての記事](https://qiita.com/haykubo/items/5e0c26c0f03ed52e6cdb)
  - ![アトミックデザインについてのメモ書き](https://github.com/mayuge/OpenDataChallenge/blob/main/01_%E8%A8%AD%E8%A8%88/AtomicDesign%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6.md)
### システムアーキテクチャはcleanArchitecture、ヘキサゴナルアーキテクチャ使ってます。
  - ![アーキテクチャについてのメモ書き](https://github.com/mayuge/OpenDataChallenge/blob/main/01_%E8%A8%AD%E8%A8%88/%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88%E3%81%A8CleanArchitecture%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6.md)
- DDDにおけるUIとそれに付随するアプリケーション層をinfrastructure層と分離するために間にdomainで指定したインターフェースを挿入したadapter層（腐敗防止層）を追加する構成となっている。

