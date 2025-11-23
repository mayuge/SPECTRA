import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"
import type { IReqCycleApi } from "@/domain/interfaces/IReqCycleApi"
import type { ICustomLayerState } from "@/domain/interfaces/ICustomLayerState"
import type { CustomLayerNameType } from "@/domain/types/customLayerNameType"
import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import {
  TRAIN_STATION_LAYER,
  TRAIN_LINE_LAYER,
  HELLO_CYCLE_LAYER,
  DOCOMO_BIKE_SHARE_LAYER,
} from "@/domain/params/customLayerName"
import { BUTTON_DARK, BUTTON_LIGHT } from "@/domain/params/atoms"
import type { ButtonVariantType } from "@/domain/types/atomsType"

const useCustomLayerApp = (
  reqTrainApi: IReqTrainApi,
  reqCycleApi: IReqCycleApi,
  customLayerState: ICustomLayerState,
  mapCustomerLayer: IMapCustomLayer
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
    toggleTrainLayer,
    getCycleLayerVisibility,
    getTrainLayerVisibility,
  } = mapCustomerLayer

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
   * cycleレイヤーのボタンのバリアントを取得
   * @return バリアント文字列
   */
  const getCycleLayerVarient = (): ButtonVariantType => {
    return getCycleLayerVisibility() ? BUTTON_LIGHT : BUTTON_DARK
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
   * 鉄道路線レイヤーのボタンのバリアントを取得
   * @return バリアント文字列
   */
  const getTrainLayerVarient = (): ButtonVariantType => {
    return getTrainLayerVisibility() ? BUTTON_LIGHT : BUTTON_DARK
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

  return {
    onMountedCallback,
    toggleTrainLayer,
    toggleCycleLayer,
    getTrainLayerVarient,
    getCycleLayerVarient,
  }
}

export default useCustomLayerApp
