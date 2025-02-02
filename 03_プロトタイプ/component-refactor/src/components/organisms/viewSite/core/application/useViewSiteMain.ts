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
   * コールバック関数をまとめて呼び出す
   */
  const useCallback = () => {
    setTimeData(getNowTime())
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
