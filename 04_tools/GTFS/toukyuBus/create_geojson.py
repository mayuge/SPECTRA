import json
import os

# -------------------------
# バス停データ読み込み
# -------------------------
busstops_file = "busStop.json"
busroutes_file = "busRoute.json"
output_file = "tokyu_bus_routes.geojson"

if not os.path.exists(busstops_file):
    raise FileNotFoundError(f"{busstops_file} が見つかりません")
if not os.path.exists(busroutes_file):
    raise FileNotFoundError(f"{busroutes_file} が見つかりません")

with open(busstops_file, "r", encoding="utf-8") as f:
    busstops_data = json.load(f)

# stop_id → [lon, lat] マップ作成
stop_map = {}
for stop in busstops_data:
    stop_id = stop["owl:sameAs"].split(":")[-1].rstrip(".")
    lon = stop["geo:long"]
    lat = stop["geo:lat"]
    stop_map[stop_id] = [lon, lat]

# -------------------------
# 路線データ読み込み
# -------------------------
with open(busroutes_file, "r", encoding="utf-8") as f:
    patterns_data = json.load(f)

features = []

for pattern in patterns_data:
    route_id = pattern["odpt:busroute"].split(":")[-1]
    route_name = pattern.get("dc:title", route_id)
    description = pattern.get("odpt:note", "")

    coordinates = []
    for stop_order in pattern.get("odpt:busstopPoleOrder", []):
        stop_id = stop_order["odpt:busstopPole"].split(":")[-1].rstrip(".5").rstrip(".a").rstrip(".b").rstrip(".d")
        if stop_id in stop_map:
            coordinates.append(stop_map[stop_id])
        else:
            print(f"[WARN] stop_id {stop_id} not found")

    if coordinates:
        feature = {
            "type": "Feature",
            "properties": {
                "route_id": route_id,
                "route_name": route_name,
                "description": description
            },
            "geometry": {
                "type": "LineString",
                "coordinates": coordinates
            }
        }
        features.append(feature)

# -------------------------
# GeoJSON 出力
# -------------------------
geojson = {
    "type": "FeatureCollection",
    "features": features
}

os.makedirs(os.path.dirname(output_file) or ".", exist_ok=True)
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(geojson, f, ensure_ascii=False, indent=2)

print(f"[OK] GeoJSON 作成完了: {output_file}")
print(f"路線数: {len(features)}")
