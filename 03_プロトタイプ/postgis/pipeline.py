import os
import time
import subprocess
import pathlib

#ファイルシステム的にwindowsでないと動かない可能性あり
# Docker Compose を起動
print("🟢 Docker Compose 起動中...")
subprocess.run(["docker-compose", "up", "-d"], check=True)

# PostGIS の起動を待つ
print("⏳ PostGIS 起動を待機中...")
for _ in range(30):
    result = subprocess.run([
        "docker", "exec", "postgis_container",
        "pg_isready", "-U", "docker", "-d", "postgres"
    ], capture_output=True)
    if result.returncode == 0:
        break
    time.sleep(1)
else:
    print("❌ PostGIS の起動に失敗しました")
    exit(1)
print("✅ PostGIS が正常に起動しました")

# migration ディレクトリ内の GeoJSON ファイル一覧を取得
migration_dir = pathlib.Path("./migration")
geojson_files = list(migration_dir.glob("*.geojson"))
print(f"📦 {len(geojson_files)} 件の GeoJSON を検出")
for geojson_path in geojson_files:

    basename = geojson_path.stem  # 拡張子なしファイル名（例: N05-23_Station2）
    table_name = basename.lower().replace("-", "_")
    print(f"📤 インポート中: {basename} → テーブル: {table_name}")

    # Windows のパスを Docker 用に `/` 区切りへ変換
    docker_path = f"/data/{basename}.geojson"


    try:
        subprocess.run([
    "docker", "run", "--rm",
    "-v", f"{migration_dir.resolve().as_posix()}:/data",
    "--network=host",
    "osgeo/gdal:alpine-small-3.6.3",
    "ogr2ogr",
    "-f", "PostgreSQL",
    "PG:host=localhost port=5432 dbname=postgres user=docker password=docker",
    docker_path,
    "-nln", table_name,
    "-lco", "GEOMETRY_NAME=geometry",  # ここを追加
    "-overwrite"  # 既存テーブルがあれば上書き（必要に応じて）
], check=True)
        print(f"✅ {basename} のインポートに成功しました")
    except subprocess.CalledProcessError as e:
        print(f"❌ {basename} のインポートに失敗しました\n{e}")

print("🎉 全ての GeoJSON をインポートしました")
