import maplibregl, {
  GeoJSONSourceSpecification,
  LineLayerSpecification,
  ExpressionSpecification,
} from "maplibre-gl"
import { trainLineParams } from "@/domain/params/trainLineParams"
/* eslint-disable react-hooks/rules-of-hooks */
import { useReqTrainApiAdapter } from "@/infrastructure/adapters/httpClientAdapters"

// getDisplayLayer を引数で受け取るように変更
export const addTrainLineLayer = async (map: maplibregl.Map) => {
  const { getAllTrainLine } = useReqTrainApiAdapter()

  const geojson = await getAllTrainLine()

  const source: GeoJSONSourceSpecification = {
    type: "geojson",
    data: geojson,
    attribution: "西澤明",
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
      "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 10],
      "line-opacity": 1,
    },
    layout: {
      "line-cap": "round",
      "line-join": "round",
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

  // --- クリックイベントで路線名を表示 ---
  map.on("click", "base-train-line-layer", (e) => {
    const feature = e.features?.[0]
    if (!feature) return

    const routeName = feature.properties?.["路線名"]
    if (!routeName) return

    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`<div style="font-size:8px;">${routeName}</div>`)
      .addTo(map)
  })

  // クリックでカーソル変更
  map.on("mouseenter", "base-train-line-layer", () => {
    map.getCanvas().style.cursor = "pointer"
  })
  map.on("mouseleave", "base-train-line-layer", () => {
    map.getCanvas().style.cursor = ""
  })
}
