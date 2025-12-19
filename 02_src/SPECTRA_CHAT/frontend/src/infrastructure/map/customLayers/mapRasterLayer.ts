import type { IMapRasterLayer } from "@/domain/interfaces/IMapRasterLayer"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import { IMapLayer } from "@/domain/interfaces/IMapLayer"

import useMapInstance from "@/infrastructure/map/mapInstance"
import useMapLayer from "@/infrastructure/map/mapLayer"

import { ref } from "vue"

import { SATELLITE_LAYER, FLOOD_HAZARD_LAYER } from "@/domain/params/customLayerName"

const useMapRasterLayer = (): IMapRasterLayer => {
  const { toggleLayer } = useMapLayer() as IMapLayer

  const satelliteLayerVisibility = ref<boolean>(false)
  const floodHazardLayerVisibility = ref<boolean>(false)

  const getSatelliteLayerVisibility = () => satelliteLayerVisibility.value
  const getFloodHazardLayerVisiblility = () => floodHazardLayerVisibility.value

  /**
   * 汎用 Raster Layer 追加
   */
  const addRasterLayer = (
    layerId: string,
    tileUrl: string,
    options?: {
      minzoom?: number
      maxzoom?: number
      opacity?: number
      visibility?: "visible" | "none"
      beforeId?: string
      attribution?: string
    }
  ) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const mapInstance = getMapInstance()
    if (!mapInstance) return

    // すでに layer があれば何もしない
    if (mapInstance.getLayer(layerId)) return

    // source が存在しなければ追加
    if (!mapInstance.getSource(layerId)) {
      mapInstance.addSource(layerId, {
        type: "raster",
        tiles: [tileUrl],
        tileSize: 512,
        minzoom: options?.minzoom ?? 0,
        maxzoom: options?.maxzoom ?? 18,
        attribution: options?.attribution,
      })
    }

    // layer を追加（beforeId に hoppo などを指定可能）
    mapInstance.addLayer(
      {
        id: layerId,
        type: "raster",
        source: layerId,
        layout: {
          visibility: options?.visibility ?? "visible",
        },
        paint: {
          "raster-opacity": options?.opacity ?? 1,
        },
      },
      options?.beforeId ?? undefined
    )
  }

  /**
   * 地理院衛星画像レイヤーを追加
   */
  const addSatelliteLayer = () => {
    addRasterLayer(
      SATELLITE_LAYER,
      "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
      {
        maxzoom: 18,
        opacity: 1,
        visibility: "none",
        beforeId: "island-takeshima-poi",
        attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>',
      }
    )
  }
  /**
   * 洪水浸水想定区域（想定最大規模）レイヤー
   */
  const addFloodHazardLayer = () => {
    addRasterLayer(
      FLOOD_HAZARD_LAYER,
      "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png",
      {
        maxzoom: 17,
        opacity: 0.7,
        visibility: "none",
        beforeId: "island-takeshima-poi",
        attribution:
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin">ハザードマップポータルサイト</a>',
      }
    )
  }
  /**
   * 衛星画像レイヤーの表示切替
   */
  const toggleSatelliteLayer = () => {
    toggleLayer(SATELLITE_LAYER)
    satelliteLayerVisibility.value = !satelliteLayerVisibility.value
  }
  /**
   * 洪水浸水想定区域（想定最大規模）レイヤーの表示切替
   */
  const toggleFloodHazardLayer = () => {
    toggleLayer(FLOOD_HAZARD_LAYER)
    floodHazardLayerVisibility.value = !floodHazardLayerVisibility.value
  }

  return {
    getSatelliteLayerVisibility,
    getFloodHazardLayerVisiblility,
    addSatelliteLayer,
    addFloodHazardLayer,
    toggleSatelliteLayer,
    toggleFloodHazardLayer,
  }
}

export default useMapRasterLayer
