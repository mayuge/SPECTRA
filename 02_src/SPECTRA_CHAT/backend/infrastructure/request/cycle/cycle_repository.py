from fastapi import HTTPException, Request
import httpx

class CycleRepository:
    async def get_hello_cycle_port_status(self, request: Request):
        info_url = "https://api-public.odpt.org/api/v4/gbfs/hellocycling/station_information.json"
        status_url = "https://api-public.odpt.org/api/v4/gbfs/hellocycling/station_status.json"

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                info_res, status_res = await client.get(info_url), await client.get(status_url)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"HTTPリクエスト失敗: {str(e)}")

        if info_res.status_code != 200 or status_res.status_code != 200:
            raise HTTPException(status_code=info_res.status_code, detail="APIからの応答が不正です")

        info_json = info_res.json()
        status_json = status_res.json()

        stations_info = {s["station_id"]: s for s in info_json["data"]["stations"]}
        stations_status = {s["station_id"]: s for s in status_json["data"]["stations"]}

        features = []
        for station_id, info in stations_info.items():
            status = stations_status.get(station_id, {})
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [info["lon"], info["lat"]],
                },
                "properties": {
                    "station_id": station_id,
                    "name": info["name"],
                    "address": info.get("address"),
                    "vehicle_capacity": info.get("vehicle_capacity"),
                    "is_charging_station": info.get("is_charging_station"),
                    "num_bikes_available": status.get("num_bikes_available"),
                    "num_docks_available": status.get("num_docks_available"),
                    "is_renting": status.get("is_renting"),
                    "is_returning": status.get("is_returning"),
                },
            }
            features.append(feature)

        geojson = {"type": "FeatureCollection", "features": features}
        return geojson
    
    async def get_docomo_bike_share_status(self, request: Request):
        # API エンドポイント
        info_url = "https://api-public.odpt.org/api/v4/gbfs/docomo-cycle/station_information.json"
        status_url = "https://api-public.odpt.org/api/v4/gbfs/docomo-cycle/station_status.json"

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                info_res, status_res = await client.get(info_url), await client.get(status_url)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"HTTPリクエスト失敗: {str(e)}")

        if info_res.status_code != 200 or status_res.status_code != 200:
            raise HTTPException(status_code=info_res.status_code, detail="APIからの応答が不正です")

        info_json = info_res.json()
        status_json = status_res.json()

        stations_info = {s["station_id"]: s for s in info_json["data"]["stations"]}
        stations_status = {s["station_id"]: s for s in status_json["data"]["stations"]}

        # GeoJSON FeatureCollection 構築
        features = []
        for station_id, info in stations_info.items():
            status = stations_status.get(station_id, {})
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [info["lon"], info["lat"]],
                },
                "properties": {
                    "station_id": station_id,
                    "name": info["name"],
                    "capacity": info.get("capacity"),
                    "num_bikes_available": status.get("num_bikes_available"),
                    "num_docks_available": status.get("num_docks_available"),
                    "is_renting": status.get("is_renting"),
                    "is_returning": status.get("is_returning"),
                },
            }
            features.append(feature)

        geojson = {"type": "FeatureCollection", "features": features}
        return geojson