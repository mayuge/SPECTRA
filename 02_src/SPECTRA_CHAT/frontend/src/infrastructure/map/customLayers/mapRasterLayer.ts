import type { IMapRasterLayer } from "@/domain/interfaces/IMapRasterLayer"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import { IMapLayer } from "@/domain/interfaces/IMapLayer"

import useMapInstance from "@/infrastructure/map/mapInstance"
import useMapLayer from "@/infrastructure/map/mapLayer"

import { ref } from "vue"

import { SATELLITE_LAYER } from "@/domain/params/customLayerName"

const useMapRasterLayer = (): IMapRasterLayer => {
  const { toggleLayer } = useMapLayer() as IMapLayer

  const satelliteLayerVisiblity = ref<boolean>(false)

  const getSatelliteLayerVisiblity = () => satelliteLayerVisiblity.value

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
      beforeId?: string // ← ★ 追加
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
      }
    )
  }

  /**
   * 衛星画像レイヤーの表示切替
   */
  const toggleSatelliteLayer = () => {
    toggleLayer(SATELLITE_LAYER)
    satelliteLayerVisiblity.value = !satelliteLayerVisiblity.value
  }

  return {
    getSatelliteLayerVisiblity,
    addSatelliteLayer,
    toggleSatelliteLayer,
  }
}

export default useMapRasterLayer
