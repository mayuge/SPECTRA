import os
import json

class BusRepository:
    def get_bus_line_tokyo(self, request):
        base_dir = os.path.dirname(__file__)

        path = os.path.normpath(os.path.join(
            base_dir,
            "../../../domain/params/gtfs/bus/ToeiBus-GTFS/aggregated_routes.geojson"
        ))

        with open(path, encoding="utf-8") as f:
            return json.load(f)

    def get_bus_stop_tokyo(self, request):
        base_dir = os.path.dirname(__file__)

        path = os.path.normpath(os.path.join(
            base_dir,
            "../../../domain/params/gtfs/bus/ToeiBus-GTFS/aggregated_stops.geojson"
        ))

        with open(path, encoding="utf-8") as f:
            return json.load(f)
   