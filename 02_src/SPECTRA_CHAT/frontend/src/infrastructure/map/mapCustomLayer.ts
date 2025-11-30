import useMapTrainLayer from "@/infrastructure/map/customLayers/mapTrainLayer"
import useMapCycleLayer from "@/infrastructure/map/customLayers/mapCycleLayer"
import useMapBusLayer from "@/infrastructure/map/customLayers/mapBusLayer"
import useMapPopulationLayer from "@/infrastructure/map/customLayers/mapPopulationMeshLayer"

import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import type { IMapTrainLayer } from "@/domain/interfaces/IMapTrainLayer"
import type { IMapCycleLayer } from "@/domain/interfaces/IMapCycleLayer"
import type { IMapBusLayer } from "@/domain/interfaces/IMapBusLayer"
import type { IMapPopulationMeshLayer } from "@/domain/interfaces/IMapPopulationMeshLayer"

/**
 * カスタムレイヤー管理のインフラストラクチャ
 * @returns
 */
const useMapCustomLayer = (): IMapCustomLayer => {
  const mapTrainLayer = useMapTrainLayer() as IMapTrainLayer
  const mapCycleLayer = useMapCycleLayer() as IMapCycleLayer
  const mapBusLayer = useMapBusLayer() as IMapBusLayer
  const mapPopulationMeshLayer = useMapPopulationLayer() as IMapPopulationMeshLayer

  const { addTrainLineLayer, addTrainStationLayer, toggleTrainLayer, getTrainLayerVisibility } =
    mapTrainLayer

  const { addHelloCycleLayer, addDocomoBikeShareLayer, toggleCycleLayer, getCycleLayerVisibility } =
    mapCycleLayer

  const { addToeiBusPointLayer, addToeiBusLineLayer, toggleBusLayer, getBusLayerVisibility } =
    mapBusLayer

  const { addPopulationMeshLayer, togglePopulationMeshLayer, getPopulationMeshLayerVisibility } =
    mapPopulationMeshLayer

  return {
    addTrainStationLayer,
    addTrainLineLayer,
    addHelloCycleLayer,
    addDocomoBikeShareLayer,
    addToeiBusLineLayer,
    addToeiBusPointLayer,
    addPopulationMeshLayer,
    toggleCycleLayer,
    toggleTrainLayer,
    toggleBusLayer,
    togglePopulationMeshLayer,
    getCycleLayerVisibility,
    getTrainLayerVisibility,
    getBusLayerVisibility,
    getPopulationMeshLayerVisibility,
  }
}

export default useMapCustomLayer
