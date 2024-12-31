import type { GeoJSONSourceSpecification, LineLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

/**
 * 1,toei,,浅草線,,1,,FF535F,
2,toei,,三田線,,1,,0067B0,
3,toei,,新宿線,,1,,9FB01C,
4,toei,,大江戸線,,1,,CF3366,
 */

// GeoJSON ソース
const toeiSubwaySource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/LineToeiSubway.geojson",
}

const toeiSubwayLayer: LayerType = {
  id: "lineToeiSubway",
  type: "line",
  sourceId: "LineToeiSubway",
  source: toeiSubwaySource,
  layout: {
    "line-join": "round",
    "line-cap": "round",
    visibility: "visible",
  },
  paint: {
    "line-color": [
      "match",
      ["get", "N05_002"], // N05_002 属性に基づいて色を決定
      "1号線浅草線",
      "#FF535F", 
      "6号線三田線",
      "#0067B0",
      "10号線新宿線",
      "#9FB01C",
      "12号線大江戸線",
      "#CF3366",
      "#808080", // デフォルト色（色が一致しない場合）
    ],
    "line-width": 10,
    "line-opacity": 1,
  },
}

export const toeiSubwayCard: CardListType = {
  logoImg: "/assets/logos/TokyoLogo.webp",
  text: "都営地下鉄",
  dangerBadge: "交通",
  warningBadge: "地下鉄",
  primaryBadge: "ラインデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "ToeiSubwayRealTimeInfoCallback",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: toeiSubwayLayer,
}
