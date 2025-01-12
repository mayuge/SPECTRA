import type { GeoJSONSourceSpecification, LineLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

const lineBusLayer: LayerType = {
  id: "line",
  type: "line",
  sourceId: "lineBus",
  source: {
    type: "geojson",
    data: "/geojson/lineBusKanto.geojson",
  } as GeoJSONSourceSpecification,
  layout: {
    "line-join": "round",
    "line-cap": "round",
    visibility: "visible",
  },
  paint: {
    "line-color": "#4D4D4D",
    "line-width": 2,
    "line-opacity": 1,
  },
  minzoom: 13,
}

export const lineBusCard: CardListType = {
  logoImg: "/assets/logos/busLogo.webp",
  text: "バスルート",
  dangerBadge: "交通",
  warningBadge: "バス",
  primaryBadge: "ラインデータ",
  darkBadge: "国土数値情報",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "tokyoMetroRealTimeInfoCallback",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: lineBusLayer,
}
