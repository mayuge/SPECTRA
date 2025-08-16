# AtomicDesign について

- アトミックデザインは UI 部分のみのアーキテクチャです！
- AtomicDesign 　 UI を中心に据えてコンポーネントの役割を分けることによってコードを見やすく、要求に合わせて手早く変更・再利用できるように、運用する手法。また、ui とロジックの接点を 1 点（organisms）に絞ることによって、見やすくてミスの少ないコードを実現できる。また、ロジックの方のフォルダ構成はクリーンアーキテクチャに準じて作成されるため、別資料を参照

## UI(見た目) とロジックの分離について

- ここでは、UI(見た目)は本来 HTML と CSS が担うべきコード、ロジックは本来 JavaScript が担うべきコードを指す。nextjs ではそれぞれ.tsx ファイル、.ts ファイルのことである。

## AtomicDesign を具体的にどう実践するか

- 結論からいうと、基準を定めて UI コンポーネントを５種類に分けてフォルダ分けをする。これだけ。その際、UI にはロジックがなるべく入らないようにすることがポイント
- 5 種類のフォルダ名は決まっている。atoms、molecules、organisms、templates、pages の５つ
- フォルダ名からもわかるように、Web デザインを化学の原子から構成される物質にたとえ、それぞれの要素を組み合わせることで、より大きなレイアウトやページを構築する手法

```
.
├── apps/
│   └── page.tsx  //nextjsの場合最初からpageは定義されている
└── components/
    ├── atoms/
    │   └── //ここにatomsの中身を書く
    ├── molecules/
    │   └── //ここにmoleculesの中身を書く
    ├── organisms/
    │   └── //ここにorganismsの中身を書く
    └── templates/
        └── //ここにtemplatesの中身を書く
```

# atoms（原子） フォルダに入るファイルの定義

- web サイトの HTML を構成する最小単位。つまり HTML のタグに相当する概念
- 具体的には Button.tsx(button タグ)、TextLabel.tsx（p タグ）、Checkbox(input タグの type=checkbox)
- プロジェクトにおいてコンポーネント部品として複数回使われる見込みがある（必須）
- 拡張子は.tsx、stories.ts のみ

```
.
└── atoms/
    ├── buttons/
    │   ├── Button.tsx
    │   └── PullTab.tsx
    ├── inputs/
    │   ├── Checkbox.tsx
    │   ├── SliderInput.tsx
    │   ├── InputDefault.tsx
    │   └── InputPassword.tsx
    └── labels/
        ├── TextLabels.tsx
        ├── Badge.tsx
        └── Icon.tsx
```

# molecules（分子） フォルダに入るファイルの定義

- 1 個以上の atoms の部品を包含している部品、atoms を更に進化させる部品
- 具体的には、Header.tsx 　ヘッダーにはテキストラベルやボタンコンポーネントが含まれていて、複数ページで使われる（TextLabel.tsx や Button.tsx）
- ダイアログのフレーム、カードリスト部品、フォーム部品とかも入ることが多い
- プロジェクトにおいてコンポーネント部品として複数回使われる見込みがある（必須）
- 拡張子は.tsx、stories.ts のみ

```
.
└── molecules/
    ├── headers/
    │   ├── Header.tsx
    │   └── DialogHeader.tsx
    ├── forms/
    │   └── formTextInput.tsx
    └── cards/
        ├── Card.tsx
        ├── InfoCard.tsx
        └── LegendCard.tsx

```

# organisms フォルダに入るファイルの定義

- ここで基本的にコードを書いていく。一番重要なフォルダ。
- サイトのページ名（画面名）でフォルダを作る
- ここで要素（atoms、molecules、その他）を組み合わせる場所
- ロジックとの接点を作る
- ui フォルダには.tsx が入る
- core フォルダには.ts が入る

```
.
└── organisms/
    └── [画面名]Site/
        ├── ui/
        │   ├── [画面名]SiteMain.tsx
        │   ├── [機能1]App.tsx
        │   ├── [機能2]App.tsx
        │   └── [機能3]App.tsx
        └── core/
            ├── application/
            │   └── use[画面名]SiteMain.ts //usecase関数 ここで唯一のロジックとの接点を作る これが超重要！！！！！
            ├── params/
            │   └── //このページでしか使わないパラメータがある場合ここに入る
            └── types/
                └── //このページでしか使わない型がある場合ここに入る
```

# templates フォルダに入るファイルの定義

- サイトのページ名（画面名）でファイルを作る
- 基本的には何も入れない。
- 多言語対応、ダークモード対応、画面サイズによって表示するものを変える　状態によって表示するものを変える必要があるとき（ログインのダッシュボードとかもありうる？）

# pages について

- template をそのまま呼び出しておいておくだけ。ここには何も入れない。それが重要。
