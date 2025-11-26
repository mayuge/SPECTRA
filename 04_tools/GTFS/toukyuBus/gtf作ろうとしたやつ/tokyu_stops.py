import json
import csv
import os

# ODPT バス停 JSON
ODPT_JSON_FILE = "busStop.json"  # ファイル名を変更してください
OUTPUT_DIR = "gtfs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ----------------------
# stops.txt 作成
# ----------------------
with open(ODPT_JSON_FILE, encoding="utf-8") as f:
    stops_data = json.load(f)

stops_file = os.path.join(OUTPUT_DIR, "stops.txt")
with open(stops_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["stop_id","stop_name","stop_lat","stop_lon"])
    writer.writeheader()
    for stop in stops_data:
        writer.writerow({
            "stop_id": stop["@id"],
            "stop_name": stop["dc:title"],
            "stop_lat": stop["geo:lat"],
            "stop_lon": stop["geo:long"]
        })

print(f"[OK] stops.txt 出力完了: {stops_file}")
print(f"停留所数: {len(stops_data)}")
