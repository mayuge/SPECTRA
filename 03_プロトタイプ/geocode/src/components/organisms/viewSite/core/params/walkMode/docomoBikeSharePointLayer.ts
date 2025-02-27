import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { useReqCycleDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import type { GeoJSONSourceSpecification } from "maplibre-gl"

// 事前にDocomo Bike Shareのステーション情報を取得
const stationStatusJson = "https://api-public.odpt.org/api/v4/gbfs/docomo-cycle/station_status.json"

// 非同期関数を使用してステーション情報を取得
const fetchStationStatusData = async () => {
  const response = await fetch(stationStatusJson);
  const data = await response.json();
  return data.data.stations; // ステーションデータを返す
};

const { reqDocomoBikeShareStationInfo } = useReqCycleDataAdapter();

const initializeLayer = async () => {
  // ステーション情報を取得
  const stationStatusData = await fetchStationStatusData();

  // Docomo Bike Shareの情報を取得
  const docomoBikeShareSymbolFeature = await reqDocomoBikeShareStationInfo();

  // GeoJSONソースを作成
  const docomoBikeShareSource: GeoJSONSourceSpecification = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: docomoBikeShareSymbolFeature.map((feature: any) => {
        const station = stationStatusData.find(
          (item:any) => item.station_id === feature.properties.station_id
        );

        // num_bikes_availableを数値型に変換して追加（デフォルト値は0）
        feature.properties.num_bikes_available = station
          ? Number(station.num_bikes_available)
          : 0;
                  // num_bikes_availableを数値型に変換して追加（デフォルト値は0）
        feature.properties.num_docks_available = station
        ? Number(station.num_docks_available)
        : 0;

        return feature;
      }),
    },
  };

  // レイヤーの作成
  const docomoBikeShareSymbolLayer: LayerType = {
    id: "pointDocomoBikeShareSymbol",
    type: "symbol",
    sourceId: "pointDocomoBikeShare",
    source: docomoBikeShareSource,
    layout: {
      "icon-image": [
        "case",
        ["==", ["get", "num_bikes_available"], 0], 
        "darkRedBike", // それ以外の場合
        ["==", ["get", "num_docks_available"], 0], 
        "warningRedBike",
        "successRedBike", // 表示するアイコン
        
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
              <h3 class="text-base font-semibold">利用できる台数${station ? station.num_bikes_available : "情報取得中..."}</h3>
              <h3 class="text-base font-semibold">返却できる台数${station ? station.num_docks_available : "情報取得中..."}</h3>
            </div>
          </div>
        `;
        return div;
      },
    },
  };

  // レイヤーをCardListTypeに追加
  return {
    logoImg: "/assets/logos/redBike.webp",
    text: "ドコモ・バイクシェアステーション",
    dangerBadge: "交通",
    warningBadge: "シェアサイクル",
    primaryBadge: "ポイントデータ",
    darkBadge: "オープンデータチャレンジ",
    isShadow: false,
    shape: "square",
    isDisplayLayer: true,
    infoButtonClick: "openModeDialog",
    displayButtonClick: "buttonClicked",
    orderButtonClick: "buttonClicked",
    layer: docomoBikeShareSymbolLayer,
  } as CardListType;
};

// 初期化されたレイヤーをエクスポート
export const docomoBikeSharePointCard = await initializeLayer();
