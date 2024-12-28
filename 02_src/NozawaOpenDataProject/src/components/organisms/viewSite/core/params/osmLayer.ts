import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

import { RasterSourceSpecification } from "maplibre-gl"

const osmLayer: LayerType = {
  id: "osm-map",
  type: "raster",
  sourceId: "osm-map",
  source: {
    type: "raster",
    tiles: ["https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png"],
    tileSize: 512,
    attribution: "OpenStreetMap",
  } as RasterSourceSpecification,
  layout: {
    visibility: "visible",
  },
  paint: {
    "raster-opacity": 1,
  },
}
export const osmCard: CardListType = {
  logoImg: "",
  text: "オープンストリートマップ",
  dangerBadge: "通常地図",
  warningBadge: "マップ",
  primaryBadge: "ベースマップ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  colorPickerClick: "buttonClicked",
  sliderClick: "buttonClicked",
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: osmLayer,
}
