import type { IMapInstance } from "@/domain/interfaces/IMapInstance.ts"
import maplibregl, { type Map } from "maplibre-gl"
import { INITIAL_VIEW_STATE } from "@/domain/params/mapConfig"
import "maplibre-gl/dist/maplibre-gl.css"
import { ref } from "vue"

const mapInstance = ref<Map | null>(null)

/**
 * 地図インスタンス管理のインフラストラクチャ
 * @source
 */
const useMapInstance = (): IMapInstance => {
  const getMapInstance = () => {
    if (mapInstance.value) {
      return mapInstance.value
    }
    mapInstance.value = new maplibregl.Map(INITIAL_VIEW_STATE)
    return mapInstance.value
  }

  return { getMapInstance }
}

export default useMapInstance
