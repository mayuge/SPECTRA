from infrastructure.database.train.train_repository import TrainRepository
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("chat-server")
train_repository = TrainRepository()

@mcp.tool()
def get_station_by_name(station_name: str):
    """駅名を指定して駅情報を取得します。"""
    station_geojson = train_repository.get_station_by_name(station_name)
    return station_geojson

@mcp.tool()
def get_train_line_by_name(line_name: str):
    """路線名を指定して路線情報を取得します。"""
    line_geojson = train_repository.get_line_by_name(line_name)
    return line_geojson
