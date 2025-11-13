import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"
import type { ICustomLayerState } from "@/domain/interfaces/ICustomLayerState"
import type { CustomLayerNameType } from "@/domain/types/customLayerNameType"
import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"

const useCustomLayerApp = (
  reqTrainApi: IReqTrainApi,
  customLayerState: ICustomLayerState,
  mapCustomerLayer: IMapCustomLayer
) => {
  const { getAllTrainStation, getAllTrainLine } = reqTrainApi
  const { setCustomLayerGeojson, getCustomLayerGeojson } = customLayerState
  const { trainStationLayer, trainLineLayer } = mapCustomerLayer
  /**
   * マウント時のコールバック
   */
  const onMountedCallback = async () => {
    // 初期データの呼び出し
    try {
      const allTrainLine = await getAllTrainLine()
      setCustomLayerGeojson("trainLine" as keyof CustomLayerNameType, allTrainLine)
      const trainLineGeojson = getCustomLayerGeojson("trainLine" as keyof CustomLayerNameType)
      trainLineLayer(trainLineGeojson)
      const allTrainStation = await getAllTrainStation()
      setCustomLayerGeojson("trainStation" as keyof CustomLayerNameType, allTrainStation)
      const trainStationGeojson = getCustomLayerGeojson("trainStation" as keyof CustomLayerNameType)
      trainStationLayer(trainStationGeojson)
    } catch (error) {
      console.error(error)
    }
  }

  const toggleTrainLayer = () => {}

  const toggleCycleLayer = () => {}

  return { onMountedCallback, toggleTrainLayer, toggleCycleLayer }
}

export default useCustomLayerApp
