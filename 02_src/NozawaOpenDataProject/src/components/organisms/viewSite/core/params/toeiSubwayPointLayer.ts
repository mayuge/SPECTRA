import type { GeoJSONSourceSpecification, SymbolLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

// GeoJSON ソース
const toeiSubwaySource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/PointToeiSubway.geojson",
}

const toeiSubwaySymbolLayer: LayerType = {
  id: "pointToeiSubwaySymbol",
  type: "symbol",
  sourceId: "pointToeiSubway",
  source: toeiSubwaySource,
  layout: {
    "icon-image": "tokyoLogo",
    "icon-size": 0.12,
    "icon-allow-overlap": true,
    visibility: "visible",
  },
}

export const toeiSubwayPointCard: CardListType = {
  logoImg: "/assets/logos/tokyoLogo.webp",
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
  layer: toeiSubwaySymbolLayer,
}