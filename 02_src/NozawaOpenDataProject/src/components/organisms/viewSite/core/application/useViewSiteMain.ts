import {
  useReqRailwayDataAdapter,
  useReqCycleDataAdapter,
} from "@/infrastructure/adapters/httpReqAdapter"
import {
  useTokyoMetroStoreAdapter,
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
  const { reqHelloCycleStationInfo, reqDocomoBikeShareStationInfo } = useReqCycleDataAdapter()
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
  const {
    setGinzaInfo,
    getGinzaInfo,
    setMarunouchiBranchInfo,
    getMarunouchiBranchInfo,
    setChiyodaInfo,
    getChiyodaInfo,
    setHibiyaInfo,
    getHibiyaInfo,
    setMarunouchiInfo,
    getMarunouchiInfo,
    setTozaiInfo,
    getTozaiInfo,
    setYurakuchoInfo,
    getYurackuchoInfo,
    setHanzomonInfo,
    getHanzomonInfo,
    setNanbokuInfo,
    getNanbokuInfo,
    setHukutoshinInfo,
    getHukutoshinInfo,
  } = useTokyoMetroStoreAdapter()
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
    setGinzaInfo(res[0]["odpt:trainInformationText"]["ja"])
    setMarunouchiInfo(res[1]["odpt:trainInformationText"]["ja"])
    setMarunouchiBranchInfo(res[2]["odpt:trainInformationText"]["ja"])
    setHibiyaInfo(res[3]["odpt:trainInformationText"]["ja"])
    setTozaiInfo(res[4]["odpt:trainInformationText"]["ja"])
    setChiyodaInfo(res[5]["odpt:trainInformationText"]["ja"])
    setYurakuchoInfo(res[6]["odpt:trainInformationText"]["ja"])
    setHanzomonInfo(res[7]["odpt:trainInformationText"]["ja"])
    setNanbokuInfo(res[8]["odpt:trainInformationText"]["ja"])
    setHukutoshinInfo(res[9]["odpt:trainInformationText"]["ja"])
  }

  /**
   * ハローサイクリングステーション情報
   */
  const helloCycleStationInfoCallback = async () => {
    const res = await reqHelloCycleStationInfo()
  }

  /**
   * ドコモバイクシェアステーション情報
   */
  const docomoBikeShareStationInfoCallback = async () => {
    const res = await reqDocomoBikeShareStationInfo()
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
    docomoBikeShareStationInfoCallback,
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
    getGinzaInfo,
    getChiyodaInfo,
    getHanzomonInfo,
    getHibiyaInfo,
    getMarunouchiInfo,
    getMarunouchiBranchInfo,
    getTozaiInfo,
    getNanbokuInfo,
    getHukutoshinInfo,
  }
}
export default useViewSiteMain
