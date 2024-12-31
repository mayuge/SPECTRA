import type { GeoJSONSourceSpecification, LineLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

// GeoJSON ソース
const tokyoMetroSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/LineTokyoMetro.geojson",
}

const tokyoMetroLayer: LayerType = {
  id: "lineTokyoMetro",
  type: "line",
  sourceId: "LinetokyoMetro",
  source: tokyoMetroSource,
  layout: {
    "line-join": "round",
    "line-cap": "round",
    visibility: "visible",
  },
  paint: {
    "line-color": [
      "match",
      ["get", "N05_002"], // N05_002 属性に基づいて色を決定
      "3号線銀座線",
      "#FF9500", // 銀座線の場合の色
      "4号線丸ノ内線",
      "#F62E36", // 丸ノ内線の場合の色
      "4号線丸ノ内線分岐線",
      "#F62E36", // 丸ノ内線の場合の色
      "2号線日比谷線",
      "#B5B5AC", // 日比谷線の場合の色
      "5号線東西線",
      "#009BBF", // 東西線の場合の色
      "9号線千代田線",
      "#00BB85", // 千代田線の場合の色
      "8号線有楽町線",
      "#C1A470", // 有楽町線の場合の色
      "11号線半蔵門線",
      "#8F76D6", // 半蔵門線の場合の色
      "7号線南北線",
      "#00AC9B", // 南北線の場合の色
      "13号線副都心線",
      "#9C5E31", // 副都心線の場合の色
      "#000000", // デフォルト色（色が一致しない場合）
    ],
    "line-width": 12,
    "line-opacity": 1,
  },
}

export const tokyoMetroCard: CardListType = {
  logoImg: "/assets/logos/tokyoMetro.webp",
  text: "東京メトロ",
  dangerBadge: "交通",
  warningBadge: "地下鉄",
  primaryBadge: "ラインデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "tokyoMetroRealTimeInfoCallback",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: tokyoMetroLayer,
}
