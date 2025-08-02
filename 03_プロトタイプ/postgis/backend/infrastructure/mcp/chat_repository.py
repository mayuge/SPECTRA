from mcp.server.fastmcp import FastMCP
import httpx
from infrastructure.database.train.train_repository import TrainRepository

mcp = FastMCP("chat-server")
train_repository = TrainRepository()

http_instance = httpx.AsyncClient()

@mcp.tool()
async def get_station_by_name(station_name: str):
    """駅名を指定して駅情報を取得します。最後の文字が駅だった場合は引数に入れない。引数の例: '東京', '池袋'"""
    #http://localhost:4000/train/station/東京
    url = f"http://localhost:4000/train/station/{station_name}"
    response = await http_instance.get(url)
    response.raise_for_status()
    return response.json()



@mcp.tool()
async def get_train_line_by_name(line_name: str):
    """路線名を指定して路線情報を取得します。引数の例: '池袋線', '山手線'"""
    #http://localhost:4000/train/line/池袋線
    url = f"http://localhost:4000/train/line/{line_name}"
    response = await http_instance.get(url)
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    """
    mcp.run()は実際にMCPサーバーを起動
    サーバーとクライアントが同じマシンの場合にはstudioを指定
    """
    mcp.run(transport="stdio")
