/* eslint-disable react-hooks/rules-of-hooks */
import maplibregl, { GeoJSONSourceSpecification, SymbolLayerSpecification } from "maplibre-gl"
import { useReqCycleApiAdapter } from "@/infrastructure/adapters/httpClientAdapters"

/**
 * HELLO CYCLING ステーションレイヤー
 */
export async function addHelloCycleStationLayer(map: maplibregl.Map) {
  const { getHelloCycleStation } = useReqCycleApiAdapter()
  const geojson = await getHelloCycleStation()

  if (!geojson || !geojson.features?.length) {
    console.warn("HELLO CYCLING: ステーションデータが空です。")
    return
  }

  const sourceId = "hello-cycle"
  const layerId = "hello-cycle-station-layer"

  // ✅ ソース登録 or 更新
  if (!map.getSource(sourceId)) {
    const source: GeoJSONSourceSpecification = { type: "geojson", data: geojson }
    map.addSource(sourceId, source)
  } else {
    ;(map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(geojson)
  }

  // ✅ アイコン読み込み
  const iconMap = {
    success: "/image/cycle/successYellowBike.webp", // 借りる・返す 両方OK
    warning: "/image/cycle/warningYellowBike.webp", // 借りるのみOK
    dark: "/image/cycle/darkYellowBike.webp", // 返すのみOK
  }

  for (const [key, path] of Object.entries(iconMap)) {
    const iconId = `${key}-yellow-bike`
    if (!map.hasImage(iconId)) {
      try {
        const image = await map.loadImage(path)
        map.addImage(iconId, image.data)
      } catch (err) {
        console.warn(`HELLO CYCLING: ${path} の読み込みに失敗`, err)
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
      // 状態ごとにアイコンを切り替え
      "icon-image": [
        "case",
        ["all", ["==", ["get", "is_renting"], true], ["==", ["get", "is_returning"], true]],
        "success-yellow-bike", // ✅ 修正
        ["all", ["==", ["get", "is_renting"], true], ["==", ["get", "is_returning"], false]],
        "warning-yellow-bike", // ✅ 修正
        ["all", ["==", ["get", "is_renting"], false], ["==", ["get", "is_returning"], true]],
        "dark-yellow-bike", // ✅ 修正
        "dark-yellow-bike", // デフォルト
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
