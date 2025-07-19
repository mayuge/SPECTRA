import { MVTLayer } from "@deck.gl/geo-layers"

export const cityPolygonLayer = new MVTLayer({
  id: "city-polygon",
  data: "https://tiles.kmproj.com/jp_estat_areamap_2020.json",

  tileSize: 512,

  // 塗りつぶしを透明に
  getFillColor: [0, 0, 0, 0],

  // 境界線を黒色の点線に
  getLineColor: [128, 128, 128, 255],
  getLineWidth: 0.5,
  lineWidthUnits: "pixels",
  dashArray: [4, 4],

  // 2D表示設定
  extruded: false,
  wireframe: false,
  elevationScale: false,
  pickable: true,

  // ...existing code...
  onTileError: (error) => {
    console.error("TileJSON error:", error)
    return null
  },
  loadOptions: {
    fetch: {
      retries: 3,
      maxRetryDelay: 1000,
      maxConcurrency: 4,
    },
  },
})
