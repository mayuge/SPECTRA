import {
  useReqRailwayDataAdapter,
  useReqCycleDataAdapter,
} from "@/infrastructure/adapters/httpReqAdapter"
import {
  useTokyoMetroStoreAdapter,
  useToeiTrainInfoStoreAdapter,
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
  const { reqTokyoMetroRealTimeInfo, reqToeiTrainRealTimeInfo } = useReqRailwayDataAdapter()
  //ダイアログ開閉
  const {
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
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
    getYurakuchoInfo,
    setHanzomonInfo,
    getHanzomonInfo,
    setNanbokuInfo,
    getNanbokuInfo,
    setHukutoshinInfo,
    getHukutoshinInfo,
  } = useTokyoMetroStoreAdapter()

  const {
    setOedoInfo,
    getOedoInfo,
    setMitaInfo,
    getMitaInfo,
    setAsakusaInfo,
    getAsakusaInfo,
    setShinjukuInfo,
    getShinjukuInfo,
    setArakawaInfo,
    getArakawaInfo,
    setNipporitoneriInfo,
    getNipporitoneriInfo,
  } = useToeiTrainInfoStoreAdapter()
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
    toeiTrainRealTimeInfoCallback()
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

  const toeiTrainRealTimeInfoCallback = async () => {
    const res = await reqToeiTrainRealTimeInfo()
    setAsakusaInfo(res[0]["odpt:trainInformationText"]["ja"])
    setMitaInfo(res[1]["odpt:trainInformationText"]["ja"])
    setShinjukuInfo(res[2]["odpt:trainInformationText"]["ja"])
    setOedoInfo(res[3]["odpt:trainInformationText"]["ja"])
    setArakawaInfo(res[4]["odpt:trainInformationText"]["ja"])
    setNipporitoneriInfo(res[5]["odpt:trainInformationText"]["ja"])
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
  }

  return {
    useCallback,
    helloCycleStationInfoCallback,
    docomoBikeShareStationInfoCallback,
    buttonClicked,
    routeToHomeSite,
    getLayerBarOpen,
    getDetailInfoDialogOpen,
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
    getYurakuchoInfo,
    getTozaiInfo,
    getNanbokuInfo,
    getHukutoshinInfo,
    getAsakusaInfo,
    getShinjukuInfo,
    getMitaInfo,
    getOedoInfo,
    getArakawaInfo,
    getNipporitoneriInfo,
  }
}
export default useViewSiteMain
