import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"
import type { IReqCycleApi } from "@/domain/interfaces/IReqCycleApi"
import type { IReqBusApi } from "@/domain/interfaces/IReqBusApi"
import type { ICustomLayerState } from "@/domain/interfaces/ICustomLayerState"
import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"

import type { CustomLayerNameType } from "@/domain/types/customLayerNameType"
import type { ButtonVariantType } from "@/domain/types/atomsType"

import {
  TRAIN_STATION_LAYER,
  TRAIN_LINE_LAYER,
  HELLO_CYCLE_LAYER,
  DOCOMO_BIKE_SHARE_LAYER,
  TOEI_BUS_POINT_LAYER,
  TOEI_BUS_LINE_LAYER,
} from "@/domain/params/customLayerName"
import { BUTTON_DARK, BUTTON_LIGHT } from "@/domain/params/atoms"

/**
 * カスタムレイヤーを管理するコアロジック
 * @source
 */
const useCustomLayerApp = (
  reqTrainApi: IReqTrainApi,
  reqCycleApi: IReqCycleApi,
  reqBusApi: IReqBusApi,
  customLayerState: ICustomLayerState,
  mapCustomerLayer: IMapCustomLayer
) => {
  const { getAllTrainStation, getAllTrainLine } = reqTrainApi
  const { getHelloCycleStation, getDocomoBikeShareStation } = reqCycleApi
  const { getToeiBusPoint, getToeiBusLine } = reqBusApi
  const { setCustomLayerGeojson, getCustomLayerGeojson } = customLayerState
  const {
    addTrainStationLayer,
    addTrainLineLayer,
    addHelloCycleLayer,
    addDocomoBikeShareLayer,
    addToeiBusLineLayer,
    addToeiBusPointLayer,
    addPopulationMeshLayer,
    addSatelliteLayer,
    toggleCycleLayer,
    toggleTrainLayer,
    toggleBusLayer,
    togglePopulationMeshLayer,
    toggleSatelliteLayer,
    getCycleLayerVisibility,
    getTrainLayerVisibility,
    getBusLayerVisibility,
    getPopulationMeshLayerVisibility,
    getSatelliteLayerVisiblity,
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
      await setToeiBusLineLayer()
      await setToeiBusPointLayer()
      addPopulationMeshLayer()
      addSatelliteLayer()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * cycleレイヤーのボタンのバリアントを取得
   * @return バリアント文字列
   */
  const getCycleLayerVariant = (): ButtonVariantType => {
    return getCycleLayerVisibility() ? BUTTON_LIGHT : BUTTON_DARK
  }

  /**
   * 鉄道路線レイヤーのボタンのバリアントを取得
   * @return バリアント文字列
   */
  const getTrainLayerVariant = (): ButtonVariantType => {
    return getTrainLayerVisibility() ? BUTTON_LIGHT : BUTTON_DARK
  }

  /**
   * バスレイヤーのボタンのバリアントを取得
   * @return バリアント文字列
   */
  const getBusLayerVariant = (): ButtonVariantType => {
    return getBusLayerVisibility() ? BUTTON_LIGHT : BUTTON_DARK
  }

  /**
   * 国勢調査メッシュレイヤーのバリアントを取得
   * @returns バリアント文字列
   */
  const getPopulationMeshLayerVariant = (): ButtonVariantType => {
    return getPopulationMeshLayerVisibility() ? BUTTON_LIGHT : BUTTON_DARK
  }

  /**衛星写真レイヤーのバリアント */
  const getSatelliteLayerVariant = (): ButtonVariantType => {
    return getSatelliteLayerVisiblity() ? BUTTON_LIGHT : BUTTON_DARK
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
   * 都営バス路線レイヤーをセット
   */
  const setToeiBusLineLayer = async () => {
    const toeiBusLine = await getToeiBusLine()
    setCustomLayerGeojson(TOEI_BUS_LINE_LAYER as keyof CustomLayerNameType, toeiBusLine)
    const toeiBusLineGeojson = getCustomLayerGeojson(
      TOEI_BUS_LINE_LAYER as keyof CustomLayerNameType
    )
    addToeiBusLineLayer(toeiBusLineGeojson)
  }

  /**
   * 都営バス停レイヤーをセット
   */
  const setToeiBusPointLayer = async () => {
    const toeiBusPoint = await getToeiBusPoint()
    setCustomLayerGeojson(TOEI_BUS_POINT_LAYER as keyof CustomLayerNameType, toeiBusPoint)
    const toeiBusPointGeojson = getCustomLayerGeojson(
      TOEI_BUS_POINT_LAYER as keyof CustomLayerNameType
    )
    addToeiBusPointLayer(toeiBusPointGeojson)
  }

  return {
    onMountedCallback,
    toggleTrainLayer,
    toggleCycleLayer,
    toggleBusLayer,
    togglePopulationMeshLayer,
    toggleSatelliteLayer,
    getTrainLayerVariant,
    getCycleLayerVariant,
    getBusLayerVariant,
    getPopulationMeshLayerVariant,
    getSatelliteLayerVariant,
  }
}

export default useCustomLayerApp
