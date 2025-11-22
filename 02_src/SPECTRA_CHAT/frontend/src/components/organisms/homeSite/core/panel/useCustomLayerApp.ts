import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"
import type { IReqCycleApi } from "@/domain/interfaces/IReqCycleApi"
import type { ICustomLayerState } from "@/domain/interfaces/ICustomLayerState"
import type { CustomLayerNameType } from "@/domain/types/customLayerNameType"
import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import {
  TRAIN_STATION_LAYER,
  TRAIN_LINE_LAYER,
  HELLO_CYCLE_LAYER,
  DOCOMO_BIKE_SHARE_LAYER,
} from "@/domain/params/customLayerName"
const useCustomLayerApp = (
  reqTrainApi: IReqTrainApi,
  reqCycleApi: IReqCycleApi,
  customLayerState: ICustomLayerState,
  mapCustomerLayer: IMapCustomLayer,
  mapLayer: IMapLayer
) => {
  const { getAllTrainStation, getAllTrainLine } = reqTrainApi
  const { getHelloCycleStation, getDocomoBikeShareStation } = reqCycleApi
  const { setCustomLayerGeojson, getCustomLayerGeojson } = customLayerState
  const {
    addTrainStationLayer,
    addTrainLineLayer,
    addHelloCycleLayer,
    addDocomoBikeShareLayer,
    toggleCycleLayer,
  } = mapCustomerLayer
  const { toggleLayer } = mapLayer
  /**
   * マウント時のコールバック
   */
  const onMountedCallback = async () => {
    // 初期データを呼び出し、カスタムレイヤーとして地図上に反映
    try {
      await setTrainLineLayer()
      await setTrainStationLayer()
      await setHelloCycleLayer()
      await setDocomoBikeShareLayer()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * ドコモ・バイクシェアレイヤーをセット
   */
  const setDocomoBikeShareLayer = async () => {
    const docomoBikeShareStation = await getDocomoBikeShareStation()
    setCustomLayerGeojson(
      DOCOMO_BIKE_SHARE_LAYER as keyof CustomLayerNameType,
      docomoBikeShareStation
    )
    const docomoBikeShareGeojson = getCustomLayerGeojson(
      DOCOMO_BIKE_SHARE_LAYER as keyof CustomLayerNameType
    )
    addDocomoBikeShareLayer(docomoBikeShareGeojson)
  }

  /**
   * ハローサイクルレイヤーをセット
   */
  const setHelloCycleLayer = async () => {
    const helloCycleStation = await getHelloCycleStation()
    setCustomLayerGeojson(HELLO_CYCLE_LAYER as keyof CustomLayerNameType, helloCycleStation)
    const helloCycleGeojson = getCustomLayerGeojson(HELLO_CYCLE_LAYER as keyof CustomLayerNameType)
    addHelloCycleLayer(helloCycleGeojson)
  }

  /**
   * 鉄道路線レイヤーをセット
   */
  const setTrainLineLayer = async () => {
    const allTrainLine = await getAllTrainLine()
    setCustomLayerGeojson(TRAIN_LINE_LAYER as keyof CustomLayerNameType, allTrainLine)
    const trainLineGeojson = getCustomLayerGeojson(TRAIN_LINE_LAYER as keyof CustomLayerNameType)
    addTrainLineLayer(trainLineGeojson)
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
    addTrainStationLayer(trainStationGeojson)
  }
  /**
   * 駅・鉄道路線レイヤーをトグルする
   */
  const toggleTrainLayer = () => {
    toggleLayer(TRAIN_STATION_LAYER)
    toggleLayer(TRAIN_LINE_LAYER)
  }

  return { onMountedCallback, toggleTrainLayer, toggleCycleLayer }
}

export default useCustomLayerApp
