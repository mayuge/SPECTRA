import useMapTrainLayer from "@/infrastructure/map/customLayers/mapTrainLayer"
import useMapCycleLayer from "@/infrastructure/map/customLayers/mapCycleLayer"

import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import type { IMapTrainLayer } from "@/domain/interfaces/IMapTrainLayer"
import type { IMapCycleLayer } from "@/domain/interfaces/IMapCycleLayer"

/**
 * カスタムレイヤー管理のインフラストラクチャ
 * @returns
 */
const useMapCustomLayer = (): IMapCustomLayer => {
  const mapTrainLayer = useMapTrainLayer() as IMapTrainLayer
  const mapCycleLayer = useMapCycleLayer() as IMapCycleLayer

  const { addTrainLineLayer, addTrainStationLayer, toggleTrainLayer, getTrainLayerVisibility } =
    mapTrainLayer

  const { addHelloCycleLayer, addDocomoBikeShareLayer, toggleCycleLayer, getCycleLayerVisibility } =
    mapCycleLayer

  return {
    addTrainStationLayer,
    addTrainLineLayer,
    addHelloCycleLayer,
    addDocomoBikeShareLayer,
    toggleCycleLayer,
    toggleTrainLayer,
    getCycleLayerVisibility,
    getTrainLayerVisibility,
  }
}

export default useMapCustomLayer
