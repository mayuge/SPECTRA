import useMapTrainLayer from "@/infrastructure/map/customLayers/mapTrainLayer"
import useMapCycleLayer from "@/infrastructure/map/customLayers/mapCycleLayer"
import useMapBusLayer from "@/infrastructure/map/customLayers/mapBusLayer"

import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import type { IMapTrainLayer } from "@/domain/interfaces/IMapTrainLayer"
import type { IMapCycleLayer } from "@/domain/interfaces/IMapCycleLayer"
import type { IMapBusLayer } from "@/domain/interfaces/IMapBusLayer"

/**
 * カスタムレイヤー管理のインフラストラクチャ
 * @returns
 */
const useMapCustomLayer = (): IMapCustomLayer => {
  const mapTrainLayer = useMapTrainLayer() as IMapTrainLayer
  const mapCycleLayer = useMapCycleLayer() as IMapCycleLayer
  const mapBusLayer = useMapBusLayer() as IMapBusLayer

  const { addTrainLineLayer, addTrainStationLayer, toggleTrainLayer, getTrainLayerVisibility } =
    mapTrainLayer

  const { addHelloCycleLayer, addDocomoBikeShareLayer, toggleCycleLayer, getCycleLayerVisibility } =
    mapCycleLayer

  const { addToeiBusLineLayer, toggleBusLayer, getBusLayerVisibility } = mapBusLayer

  return {
    addTrainStationLayer,
    addTrainLineLayer,
    addHelloCycleLayer,
    addDocomoBikeShareLayer,
    addToeiBusLineLayer,
    toggleCycleLayer,
    toggleTrainLayer,
    toggleBusLayer,
    getCycleLayerVisibility,
    getTrainLayerVisibility,
    getBusLayerVisibility,
  }
}

export default useMapCustomLayer
