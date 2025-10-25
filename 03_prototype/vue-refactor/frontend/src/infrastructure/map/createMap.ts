import type { ICreateMap } from "@/domain/interfaces/ICreateMap"
import { Map } from "maplibre-gl"
import { INITIAL_VIEW_STATE } from "@/domain/params/mapConfig"
import "maplibre-gl/dist/maplibre-gl.css"
const useCreateMap = (): ICreateMap => {
  const mapInstance = new Map(INITIAL_VIEW_STATE)
  const getMapInstance = () => {
    return mapInstance
  }
  return { getMapInstance }
}

export default useCreateMap
