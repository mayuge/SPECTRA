import { MVTLayer } from "@deck.gl/geo-layers"

// PLATEAUの3Dビルディングレイヤー
export const plateauLayer = new MVTLayer({
  id: "plateau-buildings",
  data: "https://indigo-lab.github.io/plateau-lod2-mvt/{z}/{x}/{y}.pbf",
  minZoom: 4,
  maxZoom: 25,
  tileSize: 512,
  getFillColor: [136, 136, 136, 160],
  getLineColor: [255, 255, 255, 0],
  getLineWidth: 0,
  getElevation: (f: any) => {
    const height = f.properties?.z || 0
    return height
  },
  elevationScale: true,
  // タイルエラー処理を追加
  onTileError: () => null,
  // タイルの読み込みオプションを追加
  loadOptions: {
    fetch: {
      retries: 3,
      maxRetryDelay: 1000,
      maxConcurrency: 4,
    },
  },
  refinementStrategy: "no-overlap",
  extent: [139.0, 35.0, 140.0, 36.0],
  extruded: true,
  wireframe: false,
  pickable: true,
  opacity: 0.5,
  material: {
    ambient: 0.9,
    diffuse: 0.7,
    shininess: 32,
    specularColor: [51, 51, 51],
  },
  updateTriggers: {
    getElevation: (f: any) => f.properties?.z,
  },
})
