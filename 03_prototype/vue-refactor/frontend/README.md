## volta で node のバージョン管理

```
winget install Volta.Volta
```

- 別枠で powershell 立ち上げるか再起動する

## node version22 に更新（node は偶数バージョンを使う）

## yarn は v1 系が安定

```
volta install node@22
volta install yarn@1.22.22
```

```
node --version
v22.21.0
```

## vite でプロジェクトを作成

```
yarn create vite
Select a framework→vue
typescript

```

```
yarn install
```

## 起動

```
yarn dev
```

# エイリアスパスの追加

- vite.config.ts
- tsconfig.app.json
- tsconfig.json
  を修正

# tailwind 追加

yarn add tailwindcss @tailwindcss/vite
