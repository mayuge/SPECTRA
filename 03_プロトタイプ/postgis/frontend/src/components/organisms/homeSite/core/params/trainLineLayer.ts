import { GeoJsonLayer } from "@deck.gl/layers"

//ローカルにある鉄道路線のGeoJSONデータを読み込む
export const trainLineLayer = new GeoJsonLayer({
  id: "geojson-layer",
  data: "/geo/line/trainLineLayer.geojson",
  pickable: true,
  stroked: true,
  filled: false,
  extruded: true,
  lineWidthScale: 20,
  lineWidthMinPixels: 2,
  getLineColor: [128, 128, 200],
  getLineWidth: (f) => {
    return f.properties?.width || 1
  },
  getElevation: (f: any) => {
    return f.properties?.height || 0
  },
  elevationScale: true,
  updateTriggers: {
    getLineWidth: (f: any) => f.properties?.width,
    getElevation: (f: any) => f.properties?.height,
  },
})
