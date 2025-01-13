import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

import { RasterSourceSpecification } from "maplibre-gl"

// レイヤー定義
const googleLayer: LayerType = {
  id: "google-map",
  type: "raster",
  sourceId: "google-map",
  source: {
    type: "raster",
    tiles: ["https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"],
    tileSize: 512,
    attribution: "© Google",
  } as RasterSourceSpecification,
  layout: {
    visibility: "visible",
  },
  paint: {
    "raster-opacity": 1,
  },
}

export const googleCard: CardListType = {
  logoImg: "/assets/logos/google.webp",
  text: "Googleマップ",
  dangerBadge: "ベース地図",
  successBadge: "マップ",
  primaryBadge: "ベースマップ",
  darkBadge:"Google",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: googleLayer,
}
