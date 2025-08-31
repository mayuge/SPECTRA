import { SourceSpecification, LayerSpecification } from "maplibre-gl"

// 共通の Vector タイルソース
export const gsiTextSource: SourceSpecification = {
  type: "vector",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf"],
}

// 駅名レイヤ（緑色）
export const gsiStationLayer: LayerSpecification = {
  id: "gsi-station-label",
  type: "symbol",
  source: "gsi",
  "source-layer": "label",
  filter: ["all", ["==", "ftCode", 100], ["==", "annoCtg", 422]],
  layout: {
    "text-field": ["get", "knj"],
    "text-size": [
      "interpolate",
      ["linear"],
      ["zoom"],
      11,
      11,
      12,
      13,
      13,
      15,
      14,
      18,
      15,
      24,
      16,
      30,
    ],
    "text-anchor": "top",
    "text-pitch-alignment": "viewport",
    "text-rotation-alignment": "viewport",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": "#136145",
    "text-halo-color": "#fff",
    "text-halo-width": 1,
  },
  minzoom: 11,
  maxzoom: 17,
}

// 町名レイヤ（暗灰色）
export const gsiTownLayer: LayerSpecification = {
  id: "gsi-town-label",
  type: "symbol",
  source: "gsi",
  "source-layer": "symbol",
  filter: ["all", ["==", "ftCode", 1403]],
  layout: {
    "text-field": ["get", "name"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 9, 9, 11, 11],
    "text-pitch-alignment": "viewport",
    "text-rotation-alignment": "viewport",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": "#555555",
    "text-halo-color": "#fff",
    "text-halo-width": 1,
  },
  minzoom: 9,
  maxzoom: 16,
}

// 市レイヤ（暗灰色、ズーム控えめ）
export const gsiCityLayer: LayerSpecification = {
  id: "gsi-city-label",
  type: "symbol",
  source: "gsi",
  "source-layer": "symbol",
  filter: [
    "all",
    ["in", "ftCode", 1402, 102], // 1402=市役所、102=東京都23区
  ],
  layout: {
    "text-field": ["get", "name"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 9, 9, 11, 11],
    "text-anchor": "top",
    "text-allow-overlap": false,
    "text-pitch-alignment": "viewport",
    "text-rotation-alignment": "viewport",
    "icon-image": "市役所・町村役場-20",
    "icon-size": 0.4,
    "icon-pitch-alignment": "viewport",
    "icon-rotation-alignment": "viewport",
  },
  paint: {
    "text-color": "rgba(100,100,100,1)",
    "text-halo-color": "rgba(255,255,255,1)",
    "text-halo-width": 1,
  },
  minzoom: 9,
  maxzoom: 16,
}

export const gsiBigCityLayer: LayerSpecification = {
  id: "gsi-big-city-label",
  type: "symbol",
  source: "gsi",
  "source-layer": "symbol",
  filter: ["==", "ftCode", 1401], // 都道府県所在地ラベル
  layout: {
    "text-field": ["get", "name"],
    "text-size": [
      "interpolate",
      ["linear"],
      ["zoom"],
      5,
      8, // ズーム5で文字サイズ8
      7,
      10, // ズーム7で文字サイズ10
      9,
      12, // ズーム9で文字サイズ12
      11,
      14, // ズーム11で文字サイズ14
      13,
      16, // ズーム13で文字サイズ16
      15,
      18, // ズーム15で文字サイズ18
      17,
      20, // ズーム17で文字サイズ20
    ],
    "text-rotation-alignment": "viewport",
    "text-pitch-alignment": "viewport",
    "text-allow-overlap": false,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-color": "#ffffff",
    "text-halo-width": 1,
  },
  minzoom: 5,
  maxzoom: 18,
}
