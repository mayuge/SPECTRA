import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { useReqCycleDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import type { GeoJSONSourceSpecification } from "maplibre-gl"
const { reqHelloCycleStationInfo } = useReqCycleDataAdapter()

let helloCycleSymbolFeature = await reqHelloCycleStationInfo()

const helloCycleSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: helloCycleSymbolFeature,
  },
}

let helloCycleSymbolLayer = {
  id: "pointHelloCycleSymbol",
  type: "symbol",
  sourceId: "pointHelloCycle",
  source: helloCycleSource,
  layout: {
    "icon-image": "yellowBike",
    "icon-size": 0.24,
    "icon-allow-overlap": true,
    visibility: "visible",
  },
  minzoom: 15,
} as LayerType

export const helloCyclePointCard: CardListType = {
  logoImg: "/assets/logos/yellowBike.webp",
  text: "HelloCycleステーション",
  dangerBadge: "交通",
  warningBadge: "地下鉄",
  primaryBadge: "ポイントデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: helloCycleSymbolLayer,
}
