import { GeoJsonLayer } from "@deck.gl/layers"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"

const { getTrainLineByName } = useMapApp()

export const trainLineLayer = new GeoJsonLayer({
  id: "train-line-layer",
  data: getTrainLineByName("山手線"),
  minZoom: 0,
  maxZoom: 16,

  getFillColor: [250, 250, 250, 255],

  // 青色のアウトライン（RGBA）
  getLineColor: [0, 0, 255, 255],

  // 線の太さ（ピクセル単位）
  lineWidthMinPixels: 5,
})
