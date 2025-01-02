import type { GeoJSONSourceSpecification, SymbolLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

// GeoJSON ソース
const tokyoMetroSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/PointTokyoMetro.geojson",
}

const tokyoMetroSymbolLayer: LayerType = {
  id: "pointTokyoMetroSymbol",
  type: "symbol",
  sourceId: "pointTokyoMetro",
  source: tokyoMetroSource,
  layout: {
    "icon-image": "tokyoMetro",
    "icon-size": 0.12,
    "icon-allow-overlap": true,
    visibility: "visible",
  },
  minzoom: 13,
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
  layer: tokyoMetroSymbolLayer,
}
