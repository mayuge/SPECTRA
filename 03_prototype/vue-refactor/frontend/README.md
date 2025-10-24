# volta で node のバージョン管理

winget install Volta.Volta

# 別枠で powershell 立ち上げるか再起動する

# node version22 に更新（node は偶数バージョンを使う）

volta install node@22
volta install yarn@1.22.22

node --version
v22.21.0

# vite でプロジェクトを作成

yarn create vite
Select a framework→vue
typescript

# 起動

yarn dev
