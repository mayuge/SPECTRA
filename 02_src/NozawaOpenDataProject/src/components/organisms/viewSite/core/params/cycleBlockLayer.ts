import type { GeoJSONSourceSpecification } from "maplibre-gl"
import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
const cycleBlockLayer: LayerType = {
  id: "polygon",
  type: "fill",
  sourceId: "BaseCityBlocks",
  source: {
    type: "geojson",
    data: "/geojson/Block_Tokyo_FeaturesToJSON.geojson",
  } as GeoJSONSourceSpecification,
  layout: {
    visibility: "visible",
  },
  paint: {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "Capacity_面積"],
      0,
      "#f2f0f7",
      10,
      "#cbc9e2",
      20,
      "#9e9ac8",
      50,
      "#6a51a3",
    ],
    "fill-opacity": 0.8,
  },
}

export const cycleBlockCard: CardListType = {
  logoImg: "/assets/logos/default.webp",
  text: "町丁目人口あたりのハローサイクルポート数",
  dangerBadge: "交通",
  warningBadge: "シェアサイクル",
  primaryBadge: "ポリゴンデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  colorPickerClick: "buttonClicked",
  sliderClick: "buttonClicked",
  infoButtonClick: "openAllDialogs",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: cycleBlockLayer,
}
