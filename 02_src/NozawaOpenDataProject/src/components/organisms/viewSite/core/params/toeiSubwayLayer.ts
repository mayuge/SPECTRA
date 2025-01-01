import type { GeoJSONSourceSpecification, LineLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { toeiSubwayLineParams } from "@/domain/params/toeiSubwayLine"

// GeoJSON ソース
const toeiSubwaySource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/LineToeiSubway.geojson",
}

// レイヤー構造
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
      ["get", "N05_002"],
      ...Object.entries(toeiSubwayLineParams).flatMap(([line, { color }]) => [line, color]),
      "#808080", // デフォルト色
    ],
    "line-width": 8,
    "line-opacity": 1,
  },
  popup: {
    template: (properties: any) => {
      const div = document.createElement("div")
      div.innerHTML = `
        <h3>${properties.N05_002 || "路線名"}</h3>
      `
      return div
    },
    options: {
      maxWidth: "400px",
    },
  },
}

// カード構造
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
