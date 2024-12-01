import { useReqRailwayDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
const useHomeSiteMain = () => {
  const { reqJrEastRealTimeLocateData, reqTokyoMetroRealTimeData } = useReqRailwayDataAdapter()
  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = async () => {
    alert("この関数はorganisms/homeSite/core/application/useHomeSiteMain.tsにあるよ！")
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
  }
}
export default useHomeSiteMain
