import json
import csv
import os

with open("busRoute.json", "r", encoding="utf-8") as f:
    data = json.load(f)

output_file = "routes.txt"
dir_name = os.path.dirname(output_file)
if dir_name:
    os.makedirs(dir_name, exist_ok=True)

fieldnames = ["route_id", "agency_id", "route_short_name", "route_long_name", "route_type"]

with open(output_file, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()

    for route_pattern in data:
        route_id = route_pattern["odpt:busroute"].split(":")[-1]
        route_short_name = route_pattern.get("dc:title", route_id)
        route_long_name = route_pattern.get("odpt:note", "")
        writer.writerow({
            "route_id": route_id,
            "agency_id": "TokyuBus",
            "route_short_name": route_short_name,
            "route_long_name": route_long_name,
            "route_type": 3
        })

print(f"[OK] routes.txt を生成しました: {output_file}")
