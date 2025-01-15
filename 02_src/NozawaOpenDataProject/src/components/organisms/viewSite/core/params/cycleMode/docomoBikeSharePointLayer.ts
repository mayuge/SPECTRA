import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { useReqCycleDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import type { GeoJSONSourceSpecification } from "maplibre-gl"

// 事前にDocomo Bike Shareのステーション情報を取得
const stationStatusJson = "https://api-public.odpt.org/api/v4/gbfs/docomo-cycle/station_status.json"

// 非同期関数を使用してステーション情報を取得
const fetchStationStatusData = async () => {
  const response = await fetch(stationStatusJson)
  const data = await response.json()
  return data.data.stations // ステーションデータを返す
}

// ステーション情報を事前に準備
let stationStatusData: any[] = []

fetchStationStatusData().then(data => {
  stationStatusData = data // ステーション情報を準備
  console.log()
})

const { reqDocomoBikeShareStationInfo } = useReqCycleDataAdapter()

// 非同期でDocomo Bike Shareの情報を取得
const docomoBikeShareSymbolFeature = await reqDocomoBikeShareStationInfo()

// GeoJSONソースの作成
const docomoBikeShareSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: docomoBikeShareSymbolFeature,
  },
}

// Popupテンプレート内で事前に準備したステーション状態を使う
const docomoBikeShareSymbolLayer = {
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
      // 事前に準備したステーション情報を利用
      const station = stationStatusData.find((item: any) => item.station_id === properties.station_id)

      // HTML要素を直接生成
      const div = document.createElement("div")
      div.innerHTML = `
        <div class="p-2">
         <div class="flex items-center gap-2 mt-2">
            <h3 class="text-base font-semibold">${properties.name}</h3>
            <h3 class="text-base font-semibold">${station ? station.num_bikes_available : '情報取得中...'}</h3>
          </div>
        </div>
      `
      return div // HTMLElementを返す
    },
  },
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
