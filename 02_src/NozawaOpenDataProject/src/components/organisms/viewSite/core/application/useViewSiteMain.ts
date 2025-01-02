import {
  useReqRailwayDataAdapter,
  useReqCycleDataAdapter,
} from "@/infrastructure/adapters/httpReqAdapter"
import {
  useDialogStoreAdapter,
  useManageLayerAdapter,
  useTimeDataStoreAdapter,
} from "@/infrastructure/adapters/storeAdapter"
import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { useGetTimeDataAdapter } from "@/infrastructure/adapters/getTimeDataAdapter"
import { HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"

const useViewSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
  //現在の時刻を取得する
  const { getNowTime } = useGetTimeDataAdapter()
  //更新時刻のセッター・ゲッター
  const { setTimeData, getTimeData } = useTimeDataStoreAdapter()
  const { reqHelloCycleStationInfo } = useReqCycleDataAdapter()
  const {
    reqJrEastRealTimeLocateData,
    reqTokyoMetroRealTimeInfo,
    reqJrEastRealTimeInfo,
    reqToeiTrainRealTimeInfo,
    reqTokyoMetroStationInfo,
  } = useReqRailwayDataAdapter()
  const {
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    getMovieDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
    setMovieDialogOpen,
  } = useDialogStoreAdapter()
  const {
    changeLayerOrder,
    getLayers,
    getCardList,
    getIsDisplayLayer,
    setIsDisplayLayer,
    setOpacity,
  } = useManageLayerAdapter()
  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = () => {
    console.log("buttonClicked")
  }
  /**
   * コールバック関数をまとめて呼び出す
   */
  const useCallback = () => {
    jrEastRealTimeLocateDataCallback()
    jrEastRealTimeInfoCallback()
    tokyoMetroRealTimeInfoCallback()
    tokyoMetroStationInfoCallback()
    toeiTrainRealTimeInfoCallback()
    helloCycleStationInfoCallback()
    setTimeData(getNowTime())
    console.log(getTimeData())
  }
  /**
   * JR東日本リアルタイム車両位置データ
   */
  const jrEastRealTimeLocateDataCallback = async () => {
    //JR東日本リアルタイム車両位置データを非同期で取得する
    const res = await reqJrEastRealTimeLocateData()
    console.log("jrEastRealTimeLocateDataCallback", res)
  }
  /**
   * JR東日本リアルタイム運行情報
   */
  const jrEastRealTimeInfoCallback = async () => {
    const res = await reqJrEastRealTimeInfo()
    console.log("jrEastRealTimeInfoCallback", res)
  }
  /**
   * 東京メトロリアルタイム運行情報
   */
  const tokyoMetroRealTimeInfoCallback = async () => {
    const res = await reqTokyoMetroRealTimeInfo()
    console.log("tokyoMetroRealTimeInfoCallback", res)
  }
  /**
   * 東京メトロ駅情報
   */
  const tokyoMetroStationInfoCallback = async () => {
    const res = await reqTokyoMetroStationInfo()
    console.log("tokyoMetroStationInfoCallback ", res)
  }
  /**
   * 都営地下鉄リアルタイム運行情報
   */
  const toeiTrainRealTimeInfoCallback = async () => {
    const res = await reqToeiTrainRealTimeInfo()
    console.log("reqToeiTrainRealTimeInfoCallback", res)
  }

  const helloCycleStationInfoCallback = async () => {
    const res = await reqHelloCycleStationInfo()
    console.log("helloCycleStationInfoCallback", res)
  }

  // ホームサイトに遷移する関数
  const routeToHomeSite = () => {
    routeTo(HOME_SITE_ROOT_NAME)
  }
  //すべてのダイアログを開ける
  const openAllDialogs = () => {
    setLayerBarOpen(true)
    setDetailInfoDialogOpen(true)
    setMovieDialogOpen(true)
  }

  return {
    useCallback,
    reqHelloCycleStationInfo,
    buttonClicked,
    routeToHomeSite,
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    getMovieDialogOpen,
    setMovieDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
    openAllDialogs,
    changeLayerOrder,
    getLayers,
    getCardList,
    getIsDisplayLayer,
    setIsDisplayLayer,
    setOpacity,
    getTimeData,
  }
}
export default useViewSiteMain