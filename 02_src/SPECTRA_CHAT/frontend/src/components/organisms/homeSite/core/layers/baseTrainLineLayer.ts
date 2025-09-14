/* eslint-disable react-hooks/rules-of-hooks */
import maplibregl, {
  GeoJSONSourceSpecification,
  LineLayerSpecification,
  ExpressionSpecification,
} from "maplibre-gl"
import { trainLineParams } from "@/domain/params/trainLineParams"
import { useReqTrainApiAdapter } from "@/infrastructure/adapters/httpClientAdapters"

export async function addTrainLineLayer(map: maplibregl.Map) {
  const { getAllTrainLine } = useReqTrainApiAdapter()
  const geojson = await getAllTrainLine()

  const source: GeoJSONSourceSpecification = {
    type: "geojson",
    data: geojson,
  }

  const layer: LineLayerSpecification = {
    id: "base-train-line-layer",
    type: "line",
    source: "train-lines",
    paint: {
      "line-color": [
        "match",
        ["get", "路線名"],
        ...Object.entries(trainLineParams).flatMap(([name, param]) => [name, param.color]),
        "#808080",
      ] as unknown as ExpressionSpecification,
      "line-width": [
        "interpolate", // 線幅を補間する
        ["linear"], // 線形補間
        ["zoom"], // ズームレベルを基に補間
        10,
        1, // ズームレベル10で線幅2
        15,
        10, // ズームレベル15で線幅10
      ],

      "line-opacity": 1,
    },
    layout: {
      "line-cap": "round",
      "line-join": "round",
      visibility: "visible",
    },
  }

  if (!map.getSource("train-lines")) {
    map.addSource("train-lines", source)
  } else {
    const s = map.getSource("train-lines") as maplibregl.GeoJSONSource
    s.setData(geojson)
  }

  if (!map.getLayer("base-train-line-layer")) {
    map.addLayer(layer)
  }
}
