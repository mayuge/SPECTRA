// MapLibre で GSI ベクトルタイルを描画するためのソースとレイヤー群

import type { VectorSourceSpecification, LayerSpecification } from "maplibre-gl"

// GSI のソース
export const gsiSource: VectorSourceSpecification = {
  type: "vector",
  tiles: ["https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf"],
  minzoom: 4,
  maxzoom: 16,
}

// --- 建物（fill）
const gsiBuildingFill: LayerSpecification = {
  id: "gsi-buildings-fill",
  type: "fill",
  source: "gsi",
  "source-layer": "building", // 実データの layer 名に合わせる必要あり
  paint: {
    "fill-color": [
      "match",
      ["get", "ftCode"],
      3101,
      "rgb(220,220,220)", // 普通建物
      3102,
      "rgb(200,200,200)", // 堅ろう建物
      3103,
      "rgb(180,180,180)", // 高層建物
      3111,
      "rgb(210,210,210)", // 普通無壁舎
      3112,
      "rgb(190,190,190)", // 堅ろう無壁舎
      "rgb(250,245,230)", // その他
    ],
  },
}

// --- 建物（outline）
const gsiBuildingOutline: LayerSpecification = {
  id: "gsi-buildings-outline",
  type: "line",
  source: "gsi",
  "source-layer": "building",
  paint: {
    "line-color": "rgb(150,150,150)",
    "line-width": 0.5,
  },
}

// --- 道路（fill）
const gsiRoadFill: LayerSpecification = {
  id: "gsi-roads-fill",
  type: "fill",
  source: "gsi",
  "source-layer": "road",
  paint: {
    "fill-color": [
      "case",
      [">=", ["get", "ftCode"], 2000],
      [
        "case",
        ["<", ["get", "ftCode"], 2100],
        "rgb(255,240,180)", // 高速・主要幹線
        ["<", ["get", "ftCode"], 2200],
        "rgb(255,245,200)", // 一般道路
        ["<", ["get", "ftCode"], 2300],
        "rgb(255,250,220)", // 細街路
        ["<", ["get", "ftCode"], 3000],
        "rgb(255,250,230)", // その他道路
        "rgb(250,245,230)",
      ],
      "rgb(250,245,230)",
    ],
  },
}

// --- 道路（outline）
const gsiRoadOutline: LayerSpecification = {
  id: "gsi-roads-outline",
  type: "line",
  source: "gsi",
  "source-layer": "road",
  paint: {
    "line-color": "rgb(200,180,100)",
    "line-width": 0.6,
  },
}

// --- 水域
const gsiWaterFill: LayerSpecification = {
  id: "gsi-water-fill",
  type: "fill",
  source: "gsi",
  "source-layer": "water",
  paint: {
    "fill-color": "rgba(150,210,255,0.8)",
  },
}

const gsiWaterOutline: LayerSpecification = {
  id: "gsi-water-outline",
  type: "line",
  source: "gsi",
  "source-layer": "water",
  paint: {
    "line-color": "rgba(50,130,200,0.4)",
    "line-width": 0.25,
  },
}

// --- 公園・緑地
const gsiParkFill: LayerSpecification = {
  id: "gsi-park-fill",
  type: "fill",
  source: "gsi",
  "source-layer": "landform",
  paint: {
    "fill-color": "rgb(140,200,140)",
  },
}

// まとめて export
export const gsiLayer = [
  gsiBuildingFill,
  gsiBuildingOutline,
  gsiRoadFill,
  gsiRoadOutline,
  gsiWaterFill,
  gsiWaterOutline,
  gsiParkFill,
]
