import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"
import type { ICustomLayerState } from "@/domain/interfaces/ICustomLayerState"
import type { CustomLayerNameType } from "@/domain/types/customLayerNameType"
import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import { TRAIN_STATION_LAYER, TRAIN_LINE_LAYER } from "@/domain/params/customLayerName"
const useCustomLayerApp = (
  reqTrainApi: IReqTrainApi,
  customLayerState: ICustomLayerState,
  mapCustomerLayer: IMapCustomLayer,
  mapLayer: IMapLayer
) => {
  const { getAllTrainStation, getAllTrainLine } = reqTrainApi
  const { setCustomLayerGeojson, getCustomLayerGeojson } = customLayerState
  const { trainStationLayer, trainLineLayer } = mapCustomerLayer
  const { toggleLayer } = mapLayer
  /**
   * マウント時のコールバック
   */
  const onMountedCallback = async () => {
    // 初期データを呼び出し、カスタムレイヤーとして地図上に反映
    try {
      await setTrainLineLayer()
      await setTrainStationLayer()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 鉄道路線レイヤーをセット
   */
  const setTrainLineLayer = async () => {
    const allTrainLine = await getAllTrainLine()
    setCustomLayerGeojson(TRAIN_LINE_LAYER as keyof CustomLayerNameType, allTrainLine)
    const trainLineGeojson = getCustomLayerGeojson(TRAIN_LINE_LAYER as keyof CustomLayerNameType)
    trainLineLayer(trainLineGeojson)
  }

  /**
   * 駅レイヤーをセット
   */
  const setTrainStationLayer = async () => {
    const allTrainStation = await getAllTrainStation()
    setCustomLayerGeojson(TRAIN_STATION_LAYER as keyof CustomLayerNameType, allTrainStation)
    const trainStationGeojson = getCustomLayerGeojson(
      TRAIN_STATION_LAYER as keyof CustomLayerNameType
    )
    trainStationLayer(trainStationGeojson)
  }
  /**
   * 駅・鉄道路線レイヤーをトグルする
   */
  const toggleTrainLayer = () => {
    toggleLayer(TRAIN_STATION_LAYER)
    toggleLayer(TRAIN_LINE_LAYER)
  }

  const toggleCycleLayer = () => {}

  return { onMountedCallback, toggleTrainLayer, toggleCycleLayer }
}

export default useCustomLayerApp
