import type { GeoJSONSourceSpecification, LineLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { tokyoMetroLineParams } from "@/domain/params/tokyoMetroLine"

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
      ...Object.entries(tokyoMetroLineParams).flatMap(([line, { color }]) => [line, color]),
      "#000000", // デフォルト色（色が一致しない場合）
    ],
    "line-width": 8,
    "line-opacity": 1,
  },
}

export const tokyoMetroLineCard: CardListType = {
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
