import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

import { RasterSourceSpecification } from "maplibre-gl"

// レイヤー定義
const sateliteMapLayer: LayerType = {
  id: "satelite-map",
  type: "raster",
  sourceId: "satelite-map",
  source: {
    type: "raster",
    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"],
    tileSize: 512,
    attribution: "国土地理院",
  } as RasterSourceSpecification,
  layout: {
    visibility: "visible",
  },
  paint: {
    "raster-opacity": 1,
  },
}

export const sateliteMapCard: CardListType = {
  logoImg: "/assets/logos/kokkousyou.webp",
  text: "地理院地図　衛星画像",
  successBadge: "衛星画像",
  primaryBadge: "ベースマップ",
  darkBadge: "地理院地図",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: sateliteMapLayer,
}
