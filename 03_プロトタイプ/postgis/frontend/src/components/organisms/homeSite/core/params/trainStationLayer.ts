import { MVTLayer } from "@deck.gl/geo-layers"

export const trainStationLayer = new MVTLayer({
  id: "train-station-layer",
  data: "http://localhost:7800/public.n05_23_station2/{z}/{x}/{y}.pbf",
  minZoom: 0,
  maxZoom: 16,
  getFillColor: [255, 0, 0, 180], // 赤色
  pickable: true,
  pointRadiusUnits: "pixels", // 半径の単位をピクセルに
  getRadius: 3, // 半径3ピクセルに設定（お好みで調整）
  onClick: (info) => {
    if (info.object) {
      alert(`Feature clicked: ${JSON.stringify(info.object.properties)}`)
    }
  },
})
