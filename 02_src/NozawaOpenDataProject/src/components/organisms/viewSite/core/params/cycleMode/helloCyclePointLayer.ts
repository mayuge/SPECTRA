import { useReqCycleDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import type { GeoJSONSourceSpecification } from "maplibre-gl"

const { reqHelloCycleStationInfo, reqHelloCycleStationStatus } = useReqCycleDataAdapter()

// サイクルデータ取得
const helloCycleGeoJson = async (): Promise<GeoJSONSourceSpecification> => {
  try {
    const station = await reqHelloCycleStationInfo()
    const status = await reqHelloCycleStationStatus()
    const stationWithStatus = station.map((station: any) => {
      const statusData = status.find((s: any) => s.station_id === station.station_id)
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [station.longitude, station.latitude], // 緯度経度を指定
        },
        properties: {
          ...station,
          ...statusData,
        },
      }
    })

    return {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: stationWithStatus,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message)
    }
    return {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    }
  }
}

export const getHelloCyclePointCard = async (): Promise<CardListType> => {
  const getHelloCycleGeoJson = await helloCycleGeoJson()

  console.log("getHelloCycleGeoJson", getHelloCycleGeoJson)

  // レイヤーの作成
  const helloCycleSymbolLayer: LayerType = {
    id: "pointHelloCycleSymbol",
    type: "symbol",
    sourceId: "pointHelloCycle",
    source: getHelloCycleGeoJson,
    layout: {
      "icon-image": [
        "case",
        ["==", ["get", "num_bikes_available"], 0],
        "darkYellowBike", // それ以外の場合
        ["==", ["get", "num_docks_available"], 0],
        "warningYellowBike",
        "successYellowBike", // 表示するアイコン
      ],
      "icon-size": 0.25,
      "icon-allow-overlap": true,
      visibility: "visible",
    },
    minzoom: 15,
    popup: {
      template: (properties: any) => {
        const div = document.createElement("div")
        div.innerHTML = `
          <div class="p-2">
            <div class="mt-2">
              <h3 class="text-base font-semibold">${properties.name}</h3>
              <h3 class="text-base font-semibold">利用できる台数${properties ? properties.num_bikes_available : "情報取得中..."}</h3>
              <h3 class="text-base font-semibold">返却できる台数${properties ? properties.num_docks_available : "情報取得中..."}</h3>
            </div>
          </div>
        `
        return div
      },
    },
  }

  return {
    logoImg: "/assets/logos/yellowBike.webp",
    text: "ハローサイクリングステーション",
    dangerBadge: "交通",
    warningBadge: "サイクル",
    primaryBadge: "ポイントデータ",
    darkBadge: "オープンデータチャレンジ",
    isShadow: false,
    shape: "square",
    isDisplayLayer: true,
    infoButtonClick: "openModeDialog",
    displayButtonClick: "buttonClicked",
    orderButtonClick: "buttonClicked",
    layer: helloCycleSymbolLayer,
  } as CardListType
}

export const helloCyclePointCard = await getHelloCyclePointCard()
console.log("helloCyclePointCard", helloCyclePointCard)
