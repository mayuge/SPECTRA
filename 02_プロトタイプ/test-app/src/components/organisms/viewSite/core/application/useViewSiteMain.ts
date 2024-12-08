import { useReqRailwayDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import { useTestStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"

const useViewSiteMain = () => {
  const { reqJrEastRealTimeLocateData, reqTokyoMetroRealTimeData } = useReqRailwayDataAdapter()
  const { increment, decrement, getCount } = useTestStoreAdapter()
  const { routeTo } = useSiteRouteAdapter()
  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = () => {
    console.log("この関数はorganisms/homeSite/core/application/useViewSiteMain.tsにあるよ！")
  }
  const jrEastRealTimeLocateDataCallback = async () => {
    //JR東日本リアルタイム車両位置データを非同期で取得する
    await reqJrEastRealTimeLocateData()
  }
  const tokyoMetroRealTimeDataCallback = async () => {
    await reqTokyoMetroRealTimeData()
  }
  // ホームサイトに遷移する関数
  const RouteToHomeSite = () => {
    routeTo(HOME_SITE_ROOT_NAME)
  }

  return {
    buttonClicked,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeDataCallback,
    RouteToHomeSite,
    increment,
    decrement,
    getCount,
  }
}
export default useViewSiteMain
