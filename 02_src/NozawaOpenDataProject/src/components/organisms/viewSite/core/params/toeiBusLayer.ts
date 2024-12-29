import type { GeoJSONSourceSpecification, LineLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

const toeiBusLayer: LayerType = {
  id: "line",
  type: "line",
  sourceId: "LineToeiBus",
  source: {
    type: "geojson",
    data: "/geojson/LineToeiBus.geojson",
  } as GeoJSONSourceSpecification,
  layout: {
    "line-join": "round",
    "line-cap": "round",
    visibility: "visible",
  },
  paint: {
    "line-color": "#00FF00",
    "line-width": 3,
    "line-opacity": 1,
  },
}

export const toeiBusCard: CardListType = {
  logoImg: "/assets/logos/tokyoLogo.webp",
  text: "都営バスルート",
  dangerBadge: "交通",
  warningBadge: "バス",
  primaryBadge: "ラインデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "tokyoMetroRealTimeInfoCallback",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: toeiBusLayer,
}
