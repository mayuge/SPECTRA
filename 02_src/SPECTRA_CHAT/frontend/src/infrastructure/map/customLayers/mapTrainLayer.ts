import maplibregl, {
  type GeoJSONSourceSpecification,
  type LineLayerSpecification,
  type SymbolLayerSpecification,
} from "maplibre-gl"

import useMapInstance from "@/infrastructure/map/mapInstance"
import useMapPopup from "@/infrastructure/map/mapPopup"
import useMapLayer from "@/infrastructure/map/mapLayer"

import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPopup } from "@/domain/interfaces/IMapPopup"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IMapTrainLayer } from "@/domain/interfaces/IMapTrainLayer.ts"
import type { FeatureCollection } from "geojson"

import trainParams from "@/domain/params/trainParams.json"

import { ref } from "vue"

import { TRAIN_STATION_LAYER, TRAIN_LINE_LAYER } from "@/domain/params/customLayerName"

/**
 * 鉄道レイヤー管理のインフラストラクチャ
 * @returns
 */
const useMapTrainLayer = (): IMapTrainLayer => {
  const trainLayerVisibility = ref<boolean>(true)
  const mapInstance = useMapInstance() as IMapInstance
  const mapPopup = useMapPopup() as IMapPopup
  const mapLayer = useMapLayer() as IMapLayer

  const loadCompanyIcons = async (map: maplibregl.Map) => {
    const promises = Object.entries(trainParams).map(async ([companyName, companyData]) => {
      const iconPath = (companyData as any).path ?? "trainLogo"
      const iconId = `${companyName}-icon`
      const iconUrl = `/image/companyLogo/${iconPath}.webp`

      if (map.hasImage(iconId)) return

      try {
        const response = await fetch(iconUrl)
        const blob = await response.blob()
        const bitmap = await createImageBitmap(blob)

        map.addImage(iconId, bitmap, { pixelRatio: 2 })
      } catch (error) {
        console.error(`❌ Failed to load icon for ${companyName}:`, error)
      }
    })

    await Promise.all(promises)
  }

  const addTrainStationLayer = async (geojson: FeatureCollection) => {
    const map = mapInstance.getMapInstance()
    if (!map) return

    const sourceId = TRAIN_STATION_LAYER
    const layerId = TRAIN_STATION_LAYER

    const geojsonSource: GeoJSONSourceSpecification = { type: "geojson", data: geojson }

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, geojsonSource)
    } else {
      ;(map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(geojson)
    }

    if (map.getLayer(layerId)) return

    await loadCompanyIcons(map)

    const symbolLayer: SymbolLayerSpecification = {
      id: layerId,
      type: "symbol",
      source: sourceId,
      layout: {
        visibility: "visible",
        "icon-image": ["concat", ["get", "事業者名"], "-icon"],
        "icon-size": 0.24,
        "icon-allow-overlap": true,
        "text-field": ["get", "駅名"],
        "text-font": ["Noto Sans CJK JP Bold"],
        "text-size": 8,
        "text-anchor": "top",
        "text-offset": [0, 1],
        "text-allow-overlap": false,
      },
      paint: {
        "text-color": "#505050",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
      },
    }

    map.addLayer(symbolLayer)
    mapPopup.addTrainStationHoverPopup(layerId)
  }

  const addTrainLineLayer = (geojson: FeatureCollection) => {
    const map = mapInstance.getMapInstance()
    if (!map) return

    const sourceId = TRAIN_LINE_LAYER
    const layerId = TRAIN_LINE_LAYER

    const geojsonSource: GeoJSONSourceSpecification = { type: "geojson", data: geojson }

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, geojsonSource)
    } else {
      ;(map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(geojson)
    }

    if (map.getLayer(layerId)) return

    const lineLayer: LineLayerSpecification = {
      id: layerId,
      type: "line",
      source: sourceId,
      layout: { "line-cap": "round", "line-join": "round", visibility: "visible" },
      paint: {
        "line-color": [
          "case",
          ["has", ["get", "事業者名"], ["literal", trainParams]],
          [
            "coalesce",
            ["get", ["get", "路線名"], ["get", ["get", "事業者名"], ["literal", trainParams]]],
            "#808080",
          ],
          "#808080",
        ],
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 10],
      },
    }

    map.addLayer(lineLayer)
    mapPopup.addTrainLineHoverPopup(layerId)
  }

  /**
   * 駅・鉄道路線レイヤーをトグルする
   */
  const toggleTrainLayer = () => {
    const { toggleLayer } = mapLayer
    toggleLayer(TRAIN_STATION_LAYER)
    toggleLayer(TRAIN_LINE_LAYER)
    //ref値をトグルする
    trainLayerVisibility.value = !trainLayerVisibility.value
  }

  const getTrainLayerVisibility = (): boolean => {
    //trainレイヤーの表示・非表示状態を返す
    return trainLayerVisibility.value
  }

  return {
    addTrainStationLayer,
    addTrainLineLayer,
    toggleTrainLayer,
    getTrainLayerVisibility,
  }
}

export default useMapTrainLayer
