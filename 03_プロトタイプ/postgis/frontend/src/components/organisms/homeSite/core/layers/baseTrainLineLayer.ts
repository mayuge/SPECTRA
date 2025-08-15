import { GeoJsonLayer } from "@deck.gl/layers"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"
import { trainLineParams } from "@/domain/params/trainLineParams"

const { getAllTrainLine } = useMapApp()

// HEXカラーを [r,g,b,a] に変換する関数
const hexToRgbaArray = (hex: string, alpha = 255): [number, number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b, alpha]
}

export const baseTrainLineLayer = new GeoJsonLayer({
  id: "base-train-line-layer",
  data: getAllTrainLine(),
  minZoom: 0,
  maxZoom: 16,

  getFillColor: [250, 250, 250, 255],

  // 路線ごとの色を設定
  getLineColor: (f) => {
    const lineName = f.properties?.路線名
    const param = trainLineParams[lineName]
    if (param?.color) {
      return hexToRgbaArray(param.color)
    }
    // デフォルト: グレー
    return [128, 128, 128, 255]
  },

  lineWidthScale: 12,
  getLineWidth: (f) => f.properties?.width || 1,

  pointRadiusScale: 12,
  getPointRadius: (f) => f.properties?.radius || 5,

  pickable: true,
})
