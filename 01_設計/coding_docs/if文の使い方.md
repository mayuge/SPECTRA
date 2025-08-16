# ネストの回避 コードが複雑だとエラーが起きたり、可読性が悪化

    - if 文がネストすると一般的に悪いコードだと言われるが、そのような悪いコードをどう修正すべきかを聞かれると意外と難しいのではないだろうか。

- 悪いコードの例
  - ネストされた if 文

```ts
const exampleFunc = () => {
  if (条件１) {
    if (条件２) {
      if (条件３) {
        処理
      }
    }
  }
}
```

- 悪い修正例
  - ネストが浅くなっただけで、条件の複雑さは変わっていない。
  - 条件 4 を追加するとしたら if の条件がどんどん長くなる

```ts
const exampleFunc = () => {
  if (条件１ && 条件２ && 条件３) {
    処理
  }
}
```

- 正しい修正例
  - 早期 return による複雑性の回避
  - どうしても if 文が必要ならこのように書く

```ts
const exampleFunc = () => {
  if (!条件１) return
  if (!条件２) return
  if (!条件３) return
  処理１
}
```

# ストラテジーパターン＆ファクトリメソッドの使用　 else if をたくさん使ったり、switch 文を使わない

- 修正前

```ts
const exampleFunc = () => {
  if (条件１) {
    処理１
  } else if (条件２) {
    処理２
  } else if (条件３) {
    処理３
  }
}
```

- 修正後
  - 条件がもっと複雑なら処理の関数ごと外部化できる

```ts
type Conditions = "条件１" | "条件２" | "条件３"

const exampleFunc = (condition: Conditions) => {
  const flows: Record<Conditions, () => void> = {
    条件１: () => {
      // 処理１
    },
    条件２: () => {
      // 処理２
    },
    条件３: () => {
      // 処理３
    },
  }
  //条件に当てはまる処理を実行
  flows[condition]()
}
//引数の条件で処理を実行
exampleFunc("条件２")
```
