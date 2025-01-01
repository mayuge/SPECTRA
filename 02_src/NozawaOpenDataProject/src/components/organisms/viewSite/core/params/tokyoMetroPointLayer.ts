import type { GeoJSONSourceSpecification, CircleLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

// GeoJSON ソース
const tokyoMetroSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/PointTokyoMetro.geojson",
}

const tokyoMetroPointLayer: LayerType = {
  id: "pointTokyoMetro",
  type: "circle",
  sourceId: "pointTokyoMetro",
  source: tokyoMetroSource,
  layout: {
    visibility: "visible",
  },
  paint: {
    "circle-radius": 4,
    "circle-color": "#FFFFFF",
    "circle-opacity": 1,
    "circle-stroke-color": "#000000", // 縁取りの色
    "circle-stroke-width": 2, // 縁取りの幅
  },
}

export const tokyoMetroPointCard: CardListType = {
  logoImg: "/assets/logos/tokyoMetro.webp",
  text: "東京メトロ駅",
  dangerBadge: "交通",
  warningBadge: "地下鉄",
  primaryBadge: "ポイントデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: tokyoMetroPointLayer,
}