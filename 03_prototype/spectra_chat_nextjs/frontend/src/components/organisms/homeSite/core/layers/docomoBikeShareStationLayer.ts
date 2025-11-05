/* eslint-disable react-hooks/rules-of-hooks */
import maplibregl, { GeoJSONSourceSpecification, SymbolLayerSpecification } from "maplibre-gl"
import { useReqCycleApiAdapter } from "@/infrastructure/adapters/httpClientAdapters"

/**
 * DOCOMO BIKE SHARE ステーションレイヤー
 */
export async function addDocomoBikeShareStationLayer(map: maplibregl.Map) {
  const { getDocomoBikeShareStation } = useReqCycleApiAdapter()
  const geojson = await getDocomoBikeShareStation()
  if (!geojson || !geojson.features?.length) {
    console.warn("DOCOMO BIKE SHARE: ステーションデータが空です。")
    return
  }

  const sourceId = "docomo-bike-share"
  const layerId = "docomo-bike-share-station-layer"
  console.log("DOCOMO BIKE SHARE: ステーションデータを取得", geojson)

  // ✅ ソース登録 or 更新
  if (!map.getSource(sourceId)) {
    const source: GeoJSONSourceSpecification = { type: "geojson", data: geojson }
    map.addSource(sourceId, source)
  } else {
    ;(map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(geojson)
  }

  // ✅ アイコン読み込み
  const iconMap = {
    success: "/image/cycle/successRedBike.webp",
    warning: "/image/cycle/warningRedBike.webp",
    dark: "/image/cycle/darkRedBike.webp",
  }

  for (const [key, path] of Object.entries(iconMap)) {
    const iconId = `${key}-red-bike`
    if (!map.hasImage(iconId)) {
      try {
        const image = await map.loadImage(path)
        map.addImage(iconId, image.data)
      } catch (err) {
        console.warn(`DOCOMO BIKE SHARE: ${path} の読み込みに失敗`, err)
      }
    }
  }

  // ✅ レイヤー設定
  const layer: SymbolLayerSpecification = {
    id: layerId,
    type: "symbol",
    source: sourceId,
    minzoom: 14,
    layout: {
      "icon-image": [
        "case",
        ["all", ["==", ["get", "is_renting"], true], ["==", ["get", "is_returning"], true]],
        "success-red-bike",
        ["all", ["==", ["get", "is_renting"], true], ["==", ["get", "is_returning"], false]],
        "warning-red-bike",
        ["all", ["==", ["get", "is_renting"], false], ["==", ["get", "is_returning"], true]],
        "dark-red-bike",
        "dark-red-bike",
      ],
      "icon-size": 0.2,
      "icon-allow-overlap": true,
    },
  }

  // ✅ レイヤー追加 or 更新
  if (!map.getLayer(layerId)) {
    map.addLayer(layer)
  }
}
