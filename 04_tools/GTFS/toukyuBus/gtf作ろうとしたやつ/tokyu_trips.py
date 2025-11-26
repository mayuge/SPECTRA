import json
import csv
import os

# ODPT バスルートパターン JSON を読み込み
with open("busRoute.json", "r", encoding="utf-8") as f:
    data = json.load(f)

output_file = "trips.txt"
dir_name = os.path.dirname(output_file)
if dir_name:
    os.makedirs(dir_name, exist_ok=True)

fieldnames = ["route_id", "service_id", "trip_id", "trip_headsign", "direction_id"]

with open(output_file, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()

    for i, route_pattern in enumerate(data):
        route_id = route_pattern["odpt:busroute"].split(":")[-1]
        pattern_id = route_pattern.get("odpt:pattern", f"{i:06d}")
        trip_id = f"{route_id}.{pattern_id}"  # trip_id は route_id + pattern で一意に
        trip_headsign = f"{route_pattern.get('dc:title','')} {route_pattern.get('odpt:note','')}"
        
        writer.writerow({
            "route_id": route_id,
            "service_id": "weekdays",
            "trip_id": trip_id,
            "trip_headsign": trip_headsign,
            "direction_id": 0
        })

print(f"[OK] trips.txt を生成しました: {output_file}")
