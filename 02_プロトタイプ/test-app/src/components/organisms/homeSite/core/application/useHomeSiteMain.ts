import { useReqRailwayDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import { useTestStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
const useHomeSiteMain = () => {
  const { reqJrEastRealTimeLocateData, reqTokyoMetroRealTimeData } = useReqRailwayDataAdapter()
  const { increment, decrement, getCount } = useTestStoreAdapter()
  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = async () => {
    console.log("この関数はorganisms/homeSite/core/application/useHomeSiteMain.tsにあるよ！")
  }
  const jrEastRealTimeLocateDataCallback = async () => {
    //JR東日本リアルタイム車両位置データを非同期で取得する
    await reqJrEastRealTimeLocateData()
  }
  const tokyoMetroRealTimeDataCallback = async () => {
    await reqTokyoMetroRealTimeData()
  }
  // メニューページに遷移する関数
  const navigateToMenuSite = () => {
    window.location.href = "/menu" // メニューページに遷移する
  }

  return {
    buttonClicked,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeDataCallback,
    navigateToMenuSite,
    increment,
    decrement,
    getCount,
  }
}
export default useHomeSiteMain
