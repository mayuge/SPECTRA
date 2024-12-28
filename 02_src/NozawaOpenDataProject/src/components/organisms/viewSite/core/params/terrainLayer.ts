import type { RasterDEMSourceSpecification } from "maplibre-gl"
import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

const terrainLayer: LayerType = {
  id: "hillshade",
  type: "hillshade",
  sourceId: "hillshade",
  source: {
    type: "raster-dem",
    encoding: "terrarium",
    tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
    maxzoom: 15,
    minzoom: 1,
    attribution: "地形図",
  } as RasterDEMSourceSpecification,
  layout: {
    visibility: "visible",
  },
  paint: {},
}

export const terrainCard: CardListType = {
  logoImg: "",
  text: "陰影起伏",
  dangerBadge: "地形",
  warningBadge: "陰影",
  primaryBadge: "ベースマップ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  colorPickerClick: "buttonClicked",
  sliderClick: "buttonClicked",
  infoButtonClick: "jrEastRealTimeLocateDataCallback",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: terrainLayer,
}
