import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { useReqCycleDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"

const { reqHelloCycleStationInfo } = useReqCycleDataAdapter()

let helloCycleSymbolSource = await reqHelloCycleStationInfo()


let helloCycleSymbolLayer = await {
  id: "pointHelloCycleSymbol",
  type: "symbol",
  sourceId: "pointHelloCycle",
  source: helloCycleSymbolSource,
  layout: {
    "icon-image": "default",
    "icon-size": 0.12,
    "icon-allow-overlap": true,
    visibility: "visible",
  },
} as LayerType


export const helloCyclePointCard: CardListType = {
  logoImg: "/assets/logos/default.webp",
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