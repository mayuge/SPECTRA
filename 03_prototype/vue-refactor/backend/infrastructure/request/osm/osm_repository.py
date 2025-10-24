from fastapi import HTTPException, Request
import httpx


class OsmRepository:
    """Overpass API を使って OpenStreetMap データを取得するリポジトリ"""

    BASE_URL = "https://overpass-api.de/api/interpreter"

    async def get_osm_by_query(self, query: str, request: Request):
        """
        任意の Overpass クエリを実行して GeoJSON を取得
        """
        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.post(
                    self.BASE_URL,
                    data={"data": query},
                    headers={"User-Agent": "FastAPI OSM Client"},
                )
                response.raise_for_status()
                return response.json()
            except httpx.RequestError as e:
                raise HTTPException(status_code=500, detail=f"Overpass APIへの接続に失敗しました: {e}")
            except httpx.HTTPStatusError as e:
                raise HTTPException(status_code=e.response.status_code, detail=f"Overpass APIエラー: {e.response.text}")
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"予期しないエラー: {e}")

  