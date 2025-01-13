import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { useReqCycleDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import type { GeoJSONSourceSpecification } from "maplibre-gl"
const { reqDocomoBikeShareStationInfo } = useReqCycleDataAdapter()

let docomoBikeShareSymbolFeature = await reqDocomoBikeShareStationInfo()

const docomoBikeShareSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: docomoBikeShareSymbolFeature,
  },
}

let docomoBikeShareSymbolLayer = {
  id: "pointDocomoBikeShareSymbol",
  type: "symbol",
  sourceId: "pointDocomoBikeShare",
  source: docomoBikeShareSource,
  layout: {
    "icon-image": "redBike",
    "icon-size": 0.25,
    "icon-allow-overlap": true,
    visibility: "none",
  },
  minzoom: 15,
} as LayerType

export const docomoBikeSharePointCard: CardListType = {
  logoImg: "/assets/logos/redBike.webp",
  text: "DocomoBikeShareステーション",
  dangerBadge: "交通",
  warningBadge: "地下鉄",
  primaryBadge: "ポイントデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: false,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: docomoBikeShareSymbolLayer,
}
