from fastmcp import FastMCP

from infrastructure.database.train.train_repository import TrainRepository

mcp = FastMCP("chat-server")
train_repository = TrainRepository()


@mcp.tool()
def get_station_by_name(station_name: str):
    """駅名を指定して駅情報を取得します。"""
    #station_geojson = train_repository.get_station_by_name(station_name)
    return "get_station_by_nameが呼び出されました。駅名: " + station_name


@mcp.tool()
def get_train_line_by_name(line_name: str):
    """路線名を指定して路線情報を取得します。引数の例: '池袋線', '山手線'"""
    #line_geojson = train_repository.get_line_by_name(line_name)
    return "get_train_line_by_nameが呼び出されました。路線名: " + line_name


if __name__ == "__main__":
    """
    mcp.run()は実際にMCPサーバーを起動
    サーバーとクライアントが同じマシンの場合にはstudioを指定
    """
    mcp.run(transport="stdio")
