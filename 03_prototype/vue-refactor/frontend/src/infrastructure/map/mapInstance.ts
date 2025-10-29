import type { IMapInstance } from "@/domain/interfaces/IMapInstance.ts"
import { Map } from "maplibre-gl"
import { INITIAL_VIEW_STATE } from "@/domain/params/mapConfig"
import "maplibre-gl/dist/maplibre-gl.css"

const useMapInstance = (): IMapInstance => {
  const mapInstance = new Map(INITIAL_VIEW_STATE)
  const getMapInstance = () => {
    return mapInstance
  }
  return { getMapInstance }
}

export default useMapInstance
