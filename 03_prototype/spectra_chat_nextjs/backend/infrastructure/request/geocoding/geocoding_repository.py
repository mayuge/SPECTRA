import jageocoder
from fastapi import HTTPException, Request

class GeocodingRepository:
    def __init__(self):
        """リモートAPIモードでjageocoderを初期化"""
        try:
            jageocoder.init(url="https://jageocoder.info-proto.com/jsonrpc")
        except Exception as e:
            raise RuntimeError(f"Jageocoder初期化失敗: {e}")

    async def geocode_address(self, address: str, request: Request):
        """住所や施設名を指定してGeoJSON形式で返す（日本語表記のみ）"""
        if not address:
            raise HTTPException(status_code=400, detail="住所を指定してください")

        try:
            results = jageocoder.search(address)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"住所検索失敗: {e}")

        candidates = results.get("candidates", [])
        if not candidates:
            raise HTTPException(status_code=404, detail="該当する住所が見つかりません")

        candidate = candidates[0]
        coords = [candidate["x"], candidate["y"]]

        # ✅ fullname（都道府県・市区町村・丁目など）を日本語で連結
        fullname_ja = "".join(candidate.get("fullname", []))

        feature = {
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": coords},
            "properties": {
                "住所": fullname_ja,
                "緯度": candidate["y"],
                "経度": candidate["x"],
            },
        }

        return {"type": "FeatureCollection", "features": [feature]}
