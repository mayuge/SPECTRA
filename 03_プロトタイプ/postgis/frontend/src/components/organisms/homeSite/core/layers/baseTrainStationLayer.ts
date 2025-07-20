import { GeoJsonLayer } from "@deck.gl/layers"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"

const { getAllStation } = useMapApp()

export const baseTrainStationLayer = new GeoJsonLayer({
  id: "base-train-station-layer",
  data: getAllStation(),
  minZoom: 0,
  maxZoom: 16,

  getFillColor: [250, 250, 250, 255],

  // グレーのアウトライン（RGBA）
  getLineColor: [0, 0, 0, 255], // ダークグレー
  lineWidthScale: 12,
  getLineWidth: (f) => {
    return f.properties?.width || 1
  },

  // ポイントサイズ
  pointRadiusScale: 12,

  getPointRadius: (f) => {
    return f.properties?.radius || 5 // デフォルトの半径
  },

  pickable: true,
})
