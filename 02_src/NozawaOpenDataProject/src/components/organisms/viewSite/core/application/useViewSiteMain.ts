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
  const { reqTokyoMetroRealTimeInfo } = useReqRailwayDataAdapter()
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
    tokyoMetroRealTimeInfoCallback()
    setTimeData(getNowTime())
    console.log(getTimeData())
  }

  /**
   * 東京メトロリアルタイム運行情報
   */
  const tokyoMetroRealTimeInfoCallback = async () => {
    const res = await reqTokyoMetroRealTimeInfo()
    console.log("tokyoMetroRealTimeInfoCallback", res)
  }

  /**
   * ハローサイクリングステーション情報
   */
  const helloCycleStationInfoCallback = async () => {
    const res = await reqHelloCycleStationInfo()
    return res
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
    helloCycleStationInfoCallback,
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
