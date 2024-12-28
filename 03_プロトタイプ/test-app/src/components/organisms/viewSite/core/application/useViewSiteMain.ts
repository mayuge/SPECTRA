import { useReqRailwayDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import { useDialogStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"

const useViewSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
  const { reqJrEastRealTimeLocateData, reqTokyoMetroRealTimeInfo } = useReqRailwayDataAdapter()
  const {
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    getMovieDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
    setMovieDialogOpen,
  } = useDialogStoreAdapter()
  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = () => {
    console.log("この関数はorganisms/homeSite/core/application/useViewSiteMain.tsにあるよ！")
  }
  const jrEastRealTimeLocateDataCallback = async () => {
    //JR東日本リアルタイム車両位置データを非同期で取得する
    const res = await reqJrEastRealTimeLocateData()
    console.log(res)
  }
  const tokyoMetroRealTimeInfoCallback = async () => {
    const res = await reqTokyoMetroRealTimeInfo()
    console.log(res)
  }
  // ホームサイトに遷移する関数
  const RouteToHomeSite = () => {
    routeTo(HOME_SITE_ROOT_NAME)
  }
  const openAllDialogs = () => {
    console.log("openAllDialogs")
    setLayerBarOpen(true)
    setDetailInfoDialogOpen(true)
    setMovieDialogOpen(true)
  }

  return {
    buttonClicked,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeInfoCallback,
    RouteToHomeSite,
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    getMovieDialogOpen,
    setMovieDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
    openAllDialogs,
  }
}
export default useViewSiteMain
