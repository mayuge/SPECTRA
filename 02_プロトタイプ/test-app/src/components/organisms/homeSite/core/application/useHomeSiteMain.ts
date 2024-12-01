import { useReqRailwayDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
const useHomeSiteMain = () => {
  const { reqJrEastRealTimeLocateData } = useReqRailwayDataAdapter()
  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = async () => {
    //JR東日本リアルタイム車両位置データを非同期で取得する
    await reqJrEastRealTimeLocateData()
  }
  return {
    buttonClicked,
  }
}
export default useHomeSiteMain
