// params.ts
export const mapConfig = {
  center: [139.7024, 35.6598] as [number, number], // 地図の中心座標
  zoom: 16, // 初期ズームレベル
  styleUrls: {
    rasterUrl: "https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png", // 背景地図のURL
    demUrl: "https://cyberjapandata.gsi.go.jp/xyz/dem/{z}/{x}/{y}.txt", // 地形データのURL
    vectorUrl: "https://indigo-lab.github.io/plateau-lod2-mvt/{z}/{x}/{y}.pbf", // 3D都市モデルのURL
  },
  attributions: {
    raster:
      "<a href='https://www.openstreetmap.org/copyright' target='_blank'>© OpenStreetMap contributors</a>",
    dem: "© 国土地理院",
    vector:
      "<a href='https://github.com/indigo-lab/plateau-lod2-mvt'>plateau-lod2-mvt by indigo-lab</a>",
  },
}
