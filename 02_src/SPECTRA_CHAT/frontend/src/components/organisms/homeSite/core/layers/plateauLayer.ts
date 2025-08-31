import { MVTLayer } from "@deck.gl/geo-layers"

// 高さの基準（例: 60m以上を高層建物とみなす）
const HIGH_RISE_HEIGHT = 60

export const plateauLayer = new MVTLayer({
  id: "plateau-buildings",
  data: "https://indigo-lab.github.io/plateau-lod2-mvt/{z}/{x}/{y}.pbf",
  minZoom: 4,
  maxZoom: 25,
  tileSize: 512,
  parameters: { depthTest: true },
  getFillColor: (f: any) => {
    const height = f.properties?.z || 0

    if (height >= HIGH_RISE_HEIGHT) {
      return [100, 100, 100, 255] // 高層建物は赤っぽく表示
    } else if (height >= 31) {
      return [130, 130, 130, 255] // 中層建物はオレンジ
    } else {
      return [160, 160, 160, 255] // 低層建物はグレー
    }
  },

  getLineColor: [255, 255, 255, 0],
  getLineWidth: 0,
  getElevation: (f: any) => f.properties?.z || 0,
  elevationScale: true,

  onTileError: () => null,
  loadOptions: {
    fetch: { retries: 3, maxRetryDelay: 1000, maxConcurrency: 4 },
  },

  extent: [139.0, 35.0, 140.0, 36.0],

  extruded: true,
  wireframe: false,
  pickable: true,
  opacity: 0.7,
  material: {
    ambient: 0.9,
    diffuse: 0.7,
    shininess: 32,
    specularColor: [51, 51, 51],
  },

  updateTriggers: {
    getElevation: (f: any) => f.properties?.z,
    getFillColor: (f: any) => f.properties?.z,
  },
})
