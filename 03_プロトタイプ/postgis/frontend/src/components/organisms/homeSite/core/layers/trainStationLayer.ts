import { GeoJsonLayer } from "@deck.gl/layers"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"

const { getAllStation, getStationByName } = useMapApp()

export const trainStationLayer = new GeoJsonLayer({
  id: "train-station-layer",
  data: getStationByName("旭川"), // 駅名を指定してデータを取得
  minZoom: 0,
  maxZoom: 16,

  // 内部塗りつぶし色（赤）
  getFillColor: [255, 0, 0, 180],

  // ポイントサイズ
  pointRadiusUnits: "pixels",
  getPointRadius: 10, // 少し大きくすると目立つ

  // クリックやホバー可能にする
  pickable: true,
})
