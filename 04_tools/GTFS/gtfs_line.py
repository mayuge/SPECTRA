import os
import csv
import json
from glob import glob
from collections import defaultdict

# -------------------------
# CSV 読み込み
# -------------------------
def read_csv(path):
    with open(path, encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))

# -------------------------
# stop_times.txt → trip_id → stop_sequence
# -------------------------
def read_stop_times(path):
    trip_stops = defaultdict(list)
    with open(path, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                seq = int(row["stop_sequence"])
                trip_stops[row["trip_id"]].append((seq, row["stop_id"]))
            except:
                continue
    for trip_id in trip_stops:
        trip_stops[trip_id].sort(key=lambda x: x[0])
        trip_stops[trip_id] = [stop_id for seq, stop_id in trip_stops[trip_id]]
    return trip_stops

# -------------------------
# calendar.txt → service_id → 曜日
# -------------------------
def parse_calendar(gtfs_folder):
    calendar_path = os.path.join(gtfs_folder, "calendar.txt")
    service_calendar = {}
    if os.path.exists(calendar_path):
        data = read_csv(calendar_path)
        for row in data:
            service_id = row["service_id"]
            service_calendar[service_id] = {
                "monday": row.get("monday","0")=="1",
                "tuesday": row.get("tuesday","0")=="1",
                "wednesday": row.get("wednesday","0")=="1",
                "thursday": row.get("thursday","0")=="1",
                "friday": row.get("friday","0")=="1",
                "saturday": row.get("saturday","0")=="1",
                "sunday": row.get("sunday","0")=="1"
            }
    return service_calendar

# -------------------------
# trip_id を重複カウントせず平日/土曜本数を集計
# -------------------------
def count_trips_per_day_simple(trips_data, service_calendar):
    counts = {"weekday":0, "saturday":0}
    counted_trips = set()
    for trip in trips_data:
        trip_id = trip["trip_id"]
        if trip_id in counted_trips:
            continue
        counted_trips.add(trip_id)

        service_id = trip.get("service_id")
        cal = service_calendar.get(service_id, {})

        if any([cal.get(d) for d in ["monday","tuesday","wednesday","thursday","friday"]]):
            counts["weekday"] += 1
        if cal.get("saturday"):
            counts["saturday"] += 1
    return counts

# -------------------------
# stops.txt → stop_id → [lon, lat]
# -------------------------
def read_stops(gtfs_folder):
    stops_path = os.path.join(gtfs_folder, "stops.txt")
    stop_map = {}
    if not os.path.exists(stops_path):
        return stop_map
    with open(stops_path, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            stop_id = row["stop_id"]
            try:
                lat = float(row["stop_lat"])
                lon = float(row["stop_lon"])
                stop_map[stop_id] = [lon, lat]  # GeoJSON は [lon, lat]
            except:
                continue
    return stop_map

# -------------------------
# agency.txt → agency_id → agency_name
# -------------------------
def read_agencies(gtfs_folder):
    agency_path = os.path.join(gtfs_folder, "agency.txt")
    agencies = {}
    if os.path.exists(agency_path):
        for row in read_csv(agency_path):
            agency_id = row.get("agency_id", "0")  # agency_id がない場合は "0"
            agencies[agency_id] = row.get("agency_name", "Unknown")
    return agencies

# -------------------------
# メイン処理
# -------------------------
def generate_bus_line_geojson(root_folder, output_path):
    all_routes = []
    global_stop_map = {}

    gtfs_folders = [d for d in glob(os.path.join(root_folder, "*")) if os.path.isdir(d)]
    for gtfs_folder in gtfs_folders:
        print(f"[LOAD] {gtfs_folder}")

        routes_path = os.path.join(gtfs_folder, "routes.txt")
        trips_path = os.path.join(gtfs_folder, "trips.txt")
        stop_times_path = os.path.join(gtfs_folder, "stop_times.txt")

        if not (os.path.exists(routes_path) and os.path.exists(trips_path) and os.path.exists(stop_times_path)):
            print(f"[WARN] 必要ファイル missing → skip : {gtfs_folder}")
            continue

        # agencies 読み込み
        agencies = read_agencies(gtfs_folder)
        routes_data = read_csv(routes_path)
        trips_data = read_csv(trips_path)
        trip_stops = read_stop_times(stop_times_path)
        service_calendar = parse_calendar(gtfs_folder)
        global_stop_map.update(read_stops(gtfs_folder))

        # route_id → trips list
        route_trips_map = defaultdict(list)
        for trip in trips_data:
            route_id = trip["route_id"].strip()
            route_trips_map[route_id].append(trip)

        for route in routes_data:
            route_id = route["route_id"].strip()
            route_name = route.get("route_long_name") or route.get("route_short_name") or route_id
            route_color = "#" + route.get("route_color","000000").strip()
            agency_id = route.get("agency_id", "0")
            agency_name = agencies.get(agency_id, "Unknown")  # 会社名追加

            trips_of_route = route_trips_map.get(route_id, [])
            if not trips_of_route:
                continue

            trips_count = count_trips_per_day_simple(trips_of_route, service_calendar)
            first_trip_id = trips_of_route[0]["trip_id"]
            stop_sequence = trip_stops.get(first_trip_id, [])

            coords = []
            for stop_id in stop_sequence:
                if stop_id in global_stop_map:
                    coords.append(global_stop_map[stop_id])
                else:
                    print(f"[WARN] stop_id {stop_id} not found")

            if not coords:
                continue

            feature = {
                "type": "Feature",
                "properties": {
                    "route_id": route_id,
                    "route_name": route_name,
                    "route_color": route_color,
                    "agency_name": agency_name,  # ここに追加
                    "weekday_count": trips_count["weekday"],
                    "saturday_count": trips_count["saturday"]
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": coords
                }
            }
            all_routes.append(feature)

    geojson = {
        "type": "FeatureCollection",
        "features": all_routes
    }

    # ファイルに出力
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path,"w",encoding="utf-8") as f:
        json.dump(geojson,f,ensure_ascii=False,indent=2)

    # GeoJSON を表示
    print(json.dumps(geojson, ensure_ascii=False, indent=2))
    print(f"\n[OK] ArcLayer 用 GeoJSON 出力完了: {output_path}")
    print(f"路線数: {len(all_routes)}")


def generate_bus_line_geojson_per_agency(root_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    
    gtfs_folders = [d for d in glob(os.path.join(root_folder, "*")) if os.path.isdir(d)]
    for gtfs_folder in gtfs_folders:
        print(f"[LOAD] {gtfs_folder}")

        routes_path = os.path.join(gtfs_folder, "routes.txt")
        trips_path = os.path.join(gtfs_folder, "trips.txt")
        stop_times_path = os.path.join(gtfs_folder, "stop_times.txt")

        if not (os.path.exists(routes_path) and os.path.exists(trips_path) and os.path.exists(stop_times_path)):
            print(f"[WARN] 必要ファイル missing → skip : {gtfs_folder}")
            continue

        agencies = read_agencies(gtfs_folder)
        routes_data = read_csv(routes_path)
        trips_data = read_csv(trips_path)
        trip_stops = read_stop_times(stop_times_path)
        service_calendar = parse_calendar(gtfs_folder)
        global_stop_map = read_stops(gtfs_folder)

        route_trips_map = defaultdict(list)
        for trip in trips_data:
            route_trips_map[trip["route_id"].strip()].append(trip)

        # agency_name → features
        agency_features = defaultdict(list)

        for route in routes_data:
            route_id = route["route_id"].strip()
            route_name = route.get("route_long_name") or route.get("route_short_name") or route_id
            route_color = "#" + route.get("route_color","000000").strip()
            agency_id = route.get("agency_id", "0")
            agency_name = agencies.get(agency_id, "Unknown")

            trips_of_route = route_trips_map.get(route_id, [])
            if not trips_of_route:
                continue

            trips_count = count_trips_per_day_simple(trips_of_route, service_calendar)
            first_trip_id = trips_of_route[0]["trip_id"]
            stop_sequence = trip_stops.get(first_trip_id, [])

            coords = []
            for stop_id in stop_sequence:
                if stop_id in global_stop_map:
                    coords.append(global_stop_map[stop_id])
                else:
                    print(f"[WARN] stop_id {stop_id} not found")

            if not coords:
                continue

            feature = {
                "type": "Feature",
                "properties": {
                    "route_id": route_id,
                    "route_name": route_name,
                    "route_color": route_color,
                    "agency_name": agency_name,
                    "weekday_count": trips_count["weekday"],
                    "saturday_count": trips_count["saturday"]
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": coords
                }
            }
            agency_features[agency_name].append(feature)

        # agencyごとにGeoJSON出力
        for agency_name, features in agency_features.items():
            safe_name = agency_name.replace(" ", "_").replace("/", "_")  # ファイル名安全化
            out_path = os.path.join(output_folder, f"{safe_name}_routes.geojson")
            geojson = {"type": "FeatureCollection", "features": features}
            with open(out_path, "w", encoding="utf-8") as f:
                json.dump(geojson, f, ensure_ascii=False, indent=2)
            print(f"[OK] {agency_name} GeoJSON 出力: {out_path}")


# -------------------------
# 実行例
# -------------------------
if __name__=="__main__":
    # generate_bus_line_geojson(
    #     root_folder="C:/Users/keita/Desktop/programing/nextjs/OpenDataChallenge/04_tools/GTFS",
    #     output_path="C:/Users/keita/Desktop/programing/nextjs/OpenDataChallenge/04_tools/GTFS/output/routes_line.geojson"
    # )
    generate_bus_line_geojson_per_agency(
        root_folder="C:/Users/keita/Desktop/programing/nextjs/OpenDataChallenge/04_tools/GTFS",
        output_folder="C:/Users/keita/Desktop/programing/nextjs/OpenDataChallenge/04_tools/GTFS/output_per_agency"
    )
