import type { GeoJSONSourceSpecification } from "maplibre-gl"
import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

const floodLayer: LayerType = {
  id: "flood",
  type: "fill",
  sourceId: "floodLayer",
  source: {
    type: "geojson",
    data: "/geojson/PolygonNotMaxFloodHazardBeta.geojson",
  } as GeoJSONSourceSpecification,
  layout: {
    visibility: "visible",
  },
  paint: {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "sum_Area_SQUAREMETERS"],
      0,
      "#408000",
      30731,
      "#55aa00",
      109886,
      "#80ff00",
      237735,
      "#d5ffaa",
    ],
    "fill-opacity": 1,
  },
}

export const floodCard: CardListType = {
  logoImg: "/assets/logos/default.webp",
  text: "洪水ハザード",
  dangerBadge: "交通",
  warningBadge: "シェアサイクル",
  primaryBadge: "ポリゴンデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "openAllDialogs",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: floodLayer,
}
