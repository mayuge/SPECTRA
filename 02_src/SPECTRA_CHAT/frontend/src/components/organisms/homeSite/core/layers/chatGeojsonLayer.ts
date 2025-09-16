import maplibregl, {
  FillLayerSpecification,
  LineLayerSpecification,
  CircleLayerSpecification,
  GeoJSONSourceSpecification,
} from "maplibre-gl"
import useGeojsonStateStore from "@/infrastructure/stores/useGeojsonStore"
import type { Feature, FeatureCollection, Geometry } from "geojson"

type GeojsonType = Feature<Geometry> | FeatureCollection<Geometry>

export function addAllGeojsonLayers(map: maplibregl.Map) {
  const addLayer = (geojson: GeojsonType, idx: number) => {
    const sourceId = `geojson-${idx}`
    const layerId = `geojson-layer-${idx}`

    // GeoJSON が FeatureCollection なら features 配列、単一 Feature は配列化
    const features = geojson.type === "FeatureCollection" ? geojson.features : [geojson]

    if (!features || features.length === 0) return

    // source が存在しなければ追加、あれば更新
    if (!map.getSource(sourceId)) {
      const source: GeoJSONSourceSpecification = {
        type: "geojson",
        data: geojson,
      }
      map.addSource(sourceId, source)
    } else {
      const existingSource = map.getSource(sourceId) as maplibregl.GeoJSONSource
      existingSource.setData(geojson)
    }

    // layer が存在しなければ追加
    if (!map.getLayer(layerId)) {
      const geomType = features[0].geometry?.type
      const color = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

      if (geomType === "Point") {
        const layer: CircleLayerSpecification = {
          id: layerId,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-color": color,
            "circle-radius": 10,
            "circle-stroke-color": "#000",
            "circle-stroke-width": 1,
          },
        }
        map.addLayer(layer)
      } else if (geomType === "LineString") {
        const layer: LineLayerSpecification = {
          id: layerId,
          type: "line",
          source: sourceId,
          paint: {
            "line-color": color,
            "line-width": 4,
          },
        }
        map.addLayer(layer)
      } else if (geomType === "Polygon") {
        const layer: FillLayerSpecification = {
          id: layerId,
          type: "fill",
          source: sourceId,
          paint: {
            "fill-color": color,
            "fill-opacity": 0.5,
            "fill-outline-color": "#000",
          },
        }
        map.addLayer(layer)
      }
    }
  }

  // 初回描画
  const geojsonList: GeojsonType[] = useGeojsonStateStore.getState().geojsonList
  geojsonList.forEach((geojson, idx) => addLayer(geojson, idx))

  // store 更新時に自動描画
  useGeojsonStateStore.subscribe((state) => {
    const updatedList: GeojsonType[] = state.geojsonList
    updatedList.forEach((geojson, idx) => addLayer(geojson, idx))
  })
}
