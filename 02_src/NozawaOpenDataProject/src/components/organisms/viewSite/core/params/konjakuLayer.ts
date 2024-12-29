import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

import { RasterSourceSpecification } from "maplibre-gl"

const konjakuLayer: LayerType = {
  id: "konjakumap",
  type: "raster",
  sourceId: "konjakumap",
  source: {
    type: "raster",
    tiles: ["https://ktgis.net/kjmapw/kjtilemap/tokyo50/03/{z}/{x}/{y}.png"],
    tileSize: 512,
    scheme: "tms",
    maxzoom: 16,
    minzoom: 8,
    attribution: "今昔マップ",
  } as RasterSourceSpecification,
  layout: {
    visibility: "visible",
  },
  paint: {
    "raster-opacity": 1,
  },
}

export const konjakuCard: CardListType = {
  logoImg: "",
  text: "今昔マップ",
  dangerBadge: "歴史",
  warningBadge: "マップ",
  primaryBadge: "ベースマップ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  colorPickerClick: "buttonClicked",
  infoButtonClick: "jrEastRealTimeLocateDataCallback",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: konjakuLayer,
}
