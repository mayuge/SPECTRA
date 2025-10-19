import maplibregl, {
  FillLayerSpecification,
  LineLayerSpecification,
  CircleLayerSpecification,
  GeoJSONSourceSpecification,
} from "maplibre-gl"
import useGeojsonStateStore from "@/infrastructure/stores/useGeojsonStore"
import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"
import type { Feature, FeatureCollection, Geometry } from "geojson"
import bbox from "@turf/bbox"

type GeojsonType = Feature<Geometry> | FeatureCollection<Geometry>
function getRandomRichColor(): string {
  const r = Math.floor(Math.random() * 128) + 64
  const g = Math.floor(Math.random() * 128) + 64
  const b = Math.floor(Math.random() * 128) + 64
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`
}

export function addAllGeojsonLayers(map: maplibregl.Map) {
  const addLayer = (geojson: GeojsonType, idx: number) => {
    const sourceId = `geojson-${idx}`
    const layerId = `geojson-layer-${idx}`

    const features = geojson.type === "FeatureCollection" ? geojson.features : [geojson]
    if (!features || features.length === 0) return

    // source が存在しなければ追加、あれば更新
    if (!map.getSource(sourceId)) {
      const source: GeoJSONSourceSpecification = {
        type: "geojson",
        data: geojson,
      }
      map.addSource(sourceId, source)
      //displayLayerStoreに登録
      useDisplayLayerStore.getState().addDisplayLayer(sourceId, true)
    } else {
      const existingSource = map.getSource(sourceId) as maplibregl.GeoJSONSource
      existingSource.setData(geojson)
    }

    // layer が存在しなければ追加
    if (!map.getLayer(layerId)) {
      const geomType = features[0].geometry?.type
      const color = getRandomRichColor()

      if (geomType === "Point") {
        const layer: CircleLayerSpecification = {
          id: layerId,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-color": color,
            "circle-radius": 6,
            "circle-stroke-opacity": 0.5,
            "circle-stroke-color": color,
            "circle-stroke-width": 4,
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
            "line-width": 3,
            "line-gap-width": 5,
          },
        }
        map.addLayer(layer)
      } else if (geomType === "Polygon" || geomType === "MultiPolygon") {
        const layer: FillLayerSpecification = {
          id: layerId,
          type: "fill",
          source: sourceId,
          paint: {
            "fill-color": color,
            "fill-opacity": 0.4,
            "fill-outline-color": color,
          },
        }
        map.addLayer(layer)
      }

      // ← 新規レイヤー追加後にズーム
      const [minX, minY, maxX, maxY] = bbox(geojson)
      map.fitBounds(
        [
          [minX, minY],
          [maxX, maxY],
        ],
        { padding: 50, duration: 1000 }
      )
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
