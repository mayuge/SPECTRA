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
})

const { reqDocomoBikeShareStationInfo } = useReqCycleDataAdapter()

// 非同期でDocomo Bike Shareの情報を取得
const docomoBikeShareSymbolFeature = await reqDocomoBikeShareStationInfo()

// GeoJSONソースの作成
// GeoJSONソースの作成時にステーションごとにnum_bikes_availableをプロパティに追加
const docomoBikeShareSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: docomoBikeShareSymbolFeature.map((feature: any) => {
      // ステーションの情報をGeoJSONのpropertiesに追加
      const station = stationStatusData.find(
        (item) => item.station_id === feature.properties.station_id
      );
      feature.properties.num_bikes_available = station ? station.num_bikes_available : 0;
      return feature;
    }),
  },
};

// レイヤーの作成
const docomoBikeShareSymbolLayer = {
  id: "pointDocomoBikeShareSymbol",
  type: "symbol",
  sourceId: "pointDocomoBikeShare",
  source: docomoBikeShareSource,
  layout: {
    "icon-image": [
      "case", 
      ["!=", ["get", "num_bikes_available"], 0], // num_bikes_availableが1未満の場合
      "successRedBike" ,// それ以外のアイコン
      "darkRedBike",  // 1未満の場合のアイコン
      
    ],
    "icon-size": 0.25,
    "icon-allow-overlap": true,
    visibility: "visible",
  },
  minzoom: 15,
  popup: {
    template: (properties: any) => {
      const station = stationStatusData.find(
        (item: any) => item.station_id === properties.station_id
      );

      const div = document.createElement("div");
      div.innerHTML = `
        <div class="p-2">
          <div class="mt-2">
            <h3 class="text-base font-semibold">${properties.name}</h3>
            <h3 class="text-base font-semibold">利用できる台数${station ? station.num_bikes_available : '情報取得中...'}</h3>
            <h3 class="text-base font-semibold">返却できる台数${station ? station.num_docks_available : '情報取得中...'}</h3>
          </div>
        </div>
      `;
      return div;
    },
  },
} as LayerType;

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
