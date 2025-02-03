import type { SwitchColor } from "@/domain/types/atomsType"
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
    getHomeModeSelected,
    getPersonModeSelected,
    getGroupModeSelected,
    getFileModeSelected,
    setFileModeSelected,
    setGroupModeSelected,
    setPersonModeSelected,
    setHomeModeSelected,
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

  const getModeColor = (): SwitchColor => {
    if (getHomeModeSelected()) {
      return "danger"
    } else if (getPersonModeSelected()) {
      return "warning"
    } else if (getGroupModeSelected()) {
      return "success"
    } else if (getFileModeSelected()) {
      return "primary"
    }
    return "primary"
  }
  const getModeIcon = () => {
    if (getHomeModeSelected()) {
      return "home"
    } else if (getPersonModeSelected()) {
      return "person"
    } else if (getGroupModeSelected()) {
      return "groups"
    } else if (getFileModeSelected()) {
      return "folder"
    }
    return "menu"
  }
  const getModeText = () => {
    if (getHomeModeSelected()) {
      return "Relahaホーム"
    } else if (getPersonModeSelected()) {
      return "メンバーについて知る"
    } else if (getGroupModeSelected()) {
      return "プロジェクトについて知る"
    } else if (getFileModeSelected()) {
      return "アーカイブを閲覧"
    }
    return "Relahaホーム"
  }

  return {
    getModeText,
    getModeColor,
    getModeIcon,
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
    getFileModeSelected,
    getGroupModeSelected,
    getPersonModeSelected,
    getHomeModeSelected,
    setFileModeSelected,
    setGroupModeSelected,
    setPersonModeSelected,
    setHomeModeSelected,
  }
}
export default useViewSiteMain
