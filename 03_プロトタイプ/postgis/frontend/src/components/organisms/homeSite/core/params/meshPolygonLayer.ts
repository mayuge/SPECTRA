import { MVTLayer } from "@deck.gl/geo-layers"

// export const meshPolygonLayer = new MVTLayer({
//   id: "mesh-polygon",
//   data: "https://tiles.kmproj.com/jp_estat_mesh_2020.json",

//   tileSize: 512,

//   // 塗りつぶしを透明に
//   getFillColor: [0, 0, 0, 0],

//   // 境界線を黒色の点線に
//   getLineColor: [128, 128, 128, 255],
//   getLineWidth: 0.5,
//   lineWidthUnits: "pixels",
//   dashArray: [4, 4],

//   // 2D表示設定
//   extruded: false,
//   wireframe: false,
//   elevationScale: false,
//   pickable: true,

//   onTileError: (error) => {
//     console.error("TileJSON error:", error)
//     return null
//   },
//   loadOptions: {
//     fetch: {
//       retries: 3,
//       maxRetryDelay: 1000,
//       maxConcurrency: 4,
//     },
//   },
// })

export const meshPolygonLayer = new MVTLayer({
  id: "mesh-polygon",
  data: "https://tiles.kmproj.com/jp_estat_mesh_2020.json",

  tileSize: 512,

  // 塗りつぶし色の設定（人口に応じた色分け）
  getFillColor: (f) => {
    const population = parseInt(f.properties?.["人口（総数）"] || "0")
    if (population > 30000) return [255, 0, 0, 150] // 1万人以上：赤
    if (population > 15000) return [255, 69, 0, 150] // 8千人以上：レッドオレンジ
    if (population > 8000) return [255, 140, 0, 150] // 6千人以上：ダークオレンジ
    if (population > 5000) return [255, 165, 0, 150] // 5千人以上：オレンジ
    if (population > 3000) return [255, 191, 0, 150] // 3千人以上：ゴールド
    if (population > 2000) return [255, 215, 0, 150] // 2千人以上：オレンジイエロー
    if (population > 1000) return [255, 255, 0, 150] // 1千人以上：黄色
    return [100, 100, 100, 20] // その他：グレー
  },

  // エレベーション設定
  getElevation: (f) => {
    const population = parseInt(f.properties?.["人口（総数）"] || "0")
    return Math.sqrt(population) * 50 // 人口の平方根でスケーリング
  },

  // 境界線を黒色の点線に
  // getLineColor: [128, 128, 128, 255],
  // getLineWidth: 0.1,

  // 2D表示設定
  extruded: true,
  //wireframe: true,
  elevationScale: true,
  pickable: true,

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
