import { useReqRailwayDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import { useTestStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
import { useRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { MENU_SITE_ROOT_NAME } from "@/domain/params/siteRootName"

const useHomeSiteMain = () => {
  const { reqJrEastRealTimeLocateData, reqTokyoMetroRealTimeData } = useReqRailwayDataAdapter()
  const { increment, decrement, getCount } = useTestStoreAdapter()
  const { routeTo } = useRouteAdapter()
  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = () => {
    console.log("この関数はorganisms/homeSite/core/application/useHomeSiteMain.tsにあるよ！")
  }
  const jrEastRealTimeLocateDataCallback = async () => {
    //JR東日本リアルタイム車両位置データを非同期で取得する
    await reqJrEastRealTimeLocateData()
  }
  const tokyoMetroRealTimeDataCallback = async () => {
    await reqTokyoMetroRealTimeData()
  }
  // メニューサイトに遷移する関数
  const RouteToMenuSite = () => {
    routeTo(MENU_SITE_ROOT_NAME)
  }

  return {
    buttonClicked,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeDataCallback,
    RouteToMenuSite,
    increment,
    decrement,
    getCount,
  }
}
export default useHomeSiteMain
