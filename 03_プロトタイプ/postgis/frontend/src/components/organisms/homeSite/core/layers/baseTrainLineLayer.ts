import { GeoJsonLayer } from "@deck.gl/layers"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"

const { getAllTrainLine } = useMapApp()

export const baseTrainLineLayer = new GeoJsonLayer({
  id: "base-train-line-layer",
  data: getAllTrainLine(),
  minZoom: 0,
  maxZoom: 16,

  getFillColor: [250, 250, 250, 255],

  // グレーのアウトライン（RGBA）
  getLineColor: [128, 128, 128, 255], // ダークグレー
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
