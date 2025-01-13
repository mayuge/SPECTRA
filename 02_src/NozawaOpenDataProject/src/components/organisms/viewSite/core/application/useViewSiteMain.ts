import {
  useReqRailwayDataAdapter,
  useReqCycleDataAdapter,
} from "@/infrastructure/adapters/httpReqAdapter"
import {
  useModeStateStoreAdapter,
  useTokyoMetroStoreAdapter,
  useToeiTrainInfoStoreAdapter,
  useJrEastInfoStoreAdapter,
  useDialogStoreAdapter,
  useManageLayerAdapter,
  useTimeDataStoreAdapter,
} from "@/infrastructure/adapters/storeAdapter"
import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { useGetTimeDataAdapter } from "@/infrastructure/adapters/getTimeDataAdapter"
import { HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
import cycleModeCardLayerList from "@/components/organisms/viewSite/core/params/cycleMode/useCycleLayersMain"
import walkModeCardLayerList from "@/components/organisms/viewSite/core/params/walkMode/useWalkLayersMain"
import busModeCardLayerList from "@/components/organisms/viewSite/core/params/busMode/useBusLayersMain"
import trainModeCardLayerList from "@/components/organisms/viewSite/core/params/trainMode/useTrainLayersMain"

const useViewSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
  //現在の時刻を取得する
  const { getNowTime } = useGetTimeDataAdapter()
  //更新時刻のセッター・ゲッター
  const { setTimeData, getTimeData } = useTimeDataStoreAdapter()
  //交通モード取得
  const { getWalkModeSelected, getCycleModeSelected, getBusModeSelected, getTrainModeSelected } =
    useModeStateStoreAdapter()
  //サイクルデータ取得
  const { reqHelloCycleStationInfo, reqDocomoBikeShareStationInfo } = useReqCycleDataAdapter()
  //API呼び出し
  const { reqTokyoMetroRealTimeInfo, reqToeiTrainRealTimeInfo, reqJrEastRealTimeInfo } =
    useReqRailwayDataAdapter()
  //ダイアログ開閉
  const {
    getModeDialogOpen,
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    setModeDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
  } = useDialogStoreAdapter()
  const {
    changeLayerOrder,
    getLayers,
    setCardList,
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

  const {
    setChuoInfo,
    getChuoInfo,
    setChuoKaisokuInfo,
    getChuoKaisokuInfo,
    setSoubuInfo,
    getSoubuInfo,
    setYamanoteInfo,
    getYamanoteInfo,
    setKeihinTouhokuInfo,
    getKeihinTouhokuInfo,
    setMusasinoInfo,
    getMusasinoInfo,
  } = useJrEastInfoStoreAdapter()
  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = () => {
    console.log("buttonClicked")
  }
  /**
   * 選択されたモードを取得し、セットする
   **/
  const getSelectedMode = () => {
    if (getWalkModeSelected()) {
      setCardList(walkModeCardLayerList)
    } else if (getCycleModeSelected()) {
      setCardList(cycleModeCardLayerList)
    } else if (getBusModeSelected()) {
      setCardList(busModeCardLayerList)
    } else if (getTrainModeSelected()) {
      setCardList(trainModeCardLayerList)
    }
  }
  /**
   * 選択されたモードのテキスト取得
   **/
  const getSelectedModeText = () => {
    if (getWalkModeSelected()) {
      return "徒歩"
    } else if (getCycleModeSelected()) {
      return "シェアサイクル"
    } else if (getBusModeSelected()) {
      return "バス"
    } else if (getTrainModeSelected()) {
      return "鉄道"
    }
  }


  /**
   * コールバック関数をまとめて呼び出す
   */
  const useCallback = () => {
    tokyoMetroRealTimeInfoCallback()
    toeiTrainRealTimeInfoCallback()
    jrEastRealTimeInfoCallback()
    setTimeData(getNowTime())
    getSelectedMode()
  }
  /**
   * JR東日本運行情報
   */
  const jrEastRealTimeInfoCallback = async () => {
    const res = await reqJrEastRealTimeInfo()
    console.log("jr", res)
    setChuoInfo(getTrainInformationText(res, "odpt.Railway:JR-East.Chuo"))
    setChuoKaisokuInfo(getTrainInformationText(res, "odpt.Railway:JR-East.ChuoRapid"))
    setSoubuInfo(getTrainInformationText(res, "odpt.Railway:JR-East.Sobu"))
    setYamanoteInfo(getTrainInformationText(res, "odpt.Railway:JR-East.Yamanote"))
    setKeihinTouhokuInfo(getTrainInformationText(res, "odpt.Railway:JR-East.KeihinTohokuNegishi"))
    setMusasinoInfo(getTrainInformationText(res, "odpt.Railway:JR-East.Musashino"))
  }

  // データ型の定義
  type TrainInformation = {
    "odpt:railway": string
    "odpt:trainInformationText": { ja: string }
    [key: string]: any // 他のプロパティを許容
  }

  // "odpt:railway" をキーに検索して、"odpt:trainInformationText" を取得する関数
  const getTrainInformationText = (data: TrainInformation[], key: string): string => {
    const item = data.find((entry) => entry["odpt:railway"] === key)
    // itemが見つかった場合に情報を返す
    if (item && item["odpt:trainInformationText"]) {
      return item["odpt:trainInformationText"].ja
    }
    // 見つからなかった場合は「取得できませんでした」を返す
    return "取得できませんでした"
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
  //モードダイアログを開ける
  const openModeDialog = () => {
    setModeDialogOpen(true)
  }

  return {
    useCallback,
    helloCycleStationInfoCallback,
    docomoBikeShareStationInfoCallback,
    buttonClicked,
    routeToHomeSite,
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    getModeDialogOpen,
    getSelectedModeText,
    openModeDialog,
    setModeDialogOpen,
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
    getChuoInfo,
    getChuoKaisokuInfo,
    getSoubuInfo,
    getKeihinTouhokuInfo,
    getMusasinoInfo,
    getYamanoteInfo,
  }
}
export default useViewSiteMain
