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
  logoImg: "/assets/logos/mapLogo.webp",
  text: "オープンストリートマップ",
  successBadge: "マップ",
  primaryBadge: "ベースマップ",
  darkBadge:"OpenStreetMap",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: osmLayer,
}
