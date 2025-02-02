import {
  useReqRailwayDataAdapter,
  useReqCycleDataAdapter,
} from "@/infrastructure/adapters/httpReqAdapter"
import {
  useModeStateStoreAdapter,
  useDialogStoreAdapter,
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

  //交通モード取得
  const {
    getWalkModeSelected,
    getCycleModeSelected,
    getBusModeSelected,
    getTrainModeSelected,
    setTrainModeSelected,
    setBusModeSelected,
    setCycleModeSelected,
    setWalkModeSelected,
  } = useModeStateStoreAdapter()

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

  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = () => {}

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
    setTimeData(getNowTime())
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
    getTimeData,
    getTrainModeSelected,
    getBusModeSelected,
    getCycleModeSelected,
    getWalkModeSelected,
    setTrainModeSelected,
    setBusModeSelected,
    setCycleModeSelected,
    setWalkModeSelected,
  }
}
export default useViewSiteMain
