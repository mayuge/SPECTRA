import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { useReqCycleDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import { useCycleStationStatusStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
import type { GeoJSONSourceSpecification } from "maplibre-gl"
const { reqDocomoBikeShareStationInfo } = useReqCycleDataAdapter()
const { getDocomoBikeShareStationStatusObj } = useCycleStationStatusStoreAdapter()


let docomoBikeShareSymbolFeature = await reqDocomoBikeShareStationInfo()
// 非同期関数を使ってステーションの状態を取得
const getStationStatus = async (stationId: string) => {
  return await getDocomoBikeShareStationStatusObj(stationId);
};

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
    visibility: "visible",
  },
  minzoom: 15,
  popup: {
    template: (properties: any) => {
      // HTML要素を直接生成
      const div = document.createElement("div")
      div.innerHTML = `
        <div class="p-2">
         <div class="flex items-center gap-2 mt-2">
            <h3 class="text-base font-semibold">${properties.name}</h3>
            <h3 class="text-base font-semibold">${properties.station_id}</h3>
            // <h3 class="text-base font-semibold">${ getStationStatus(properties.station_id)}</h3>

          </div>
        </div>
      `
      return div // HTMLElementを返す
    },
  }
} as LayerType

export const docomoBikeSharePointCard: CardListType = {
  logoImg: "/assets/logos/redBike.webp",
  text: "ドコモ・バイクシェアステーション",
  dangerBadge: "交通",
  warningBadge: "シェアサイクル",
  primaryBadge: "ポイントデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: docomoBikeShareSymbolLayer,
}
