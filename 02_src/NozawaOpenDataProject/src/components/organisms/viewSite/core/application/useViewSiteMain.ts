import { useReqRailwayDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import {
  useDialogStoreAdapter,
  useManageLayerAdapter,
} from "@/infrastructure/adapters/storeAdapter"
import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"

const useViewSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
  const { reqJrEastRealTimeLocateData, reqTokyoMetroRealTimeInfo,reqJrEastRealTimeInfo} = useReqRailwayDataAdapter()
  const {
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    getMovieDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
    setMovieDialogOpen,
  } = useDialogStoreAdapter()
  const { changeLayerOrder, getLayers, getCardList, getIsDisplayLayer, setIsDisplayLayer } =
    useManageLayerAdapter()
  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = () => {
    console.log(getLayers())
  }
  /**
   * JR東日本リアルタイム車両位置データ
   */
  const jrEastRealTimeLocateDataCallback = async () => {
    //JR東日本リアルタイム車両位置データを非同期で取得する
    const res = await reqJrEastRealTimeLocateData()
    console.log(res)
  }
  /**
   * JR東日本リアルタイム運行情報
   */
  const jrEastRealTimeInfoCallback = async () => {
    console.log('called')
    const res = await reqJrEastRealTimeInfo()
    console.log(res)
  }
  /**
   * 東京メトロリアルタイム運行情報
   */
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

  const setOpacity = (index:number,value:number)=>{
    console.log(index,value)
  }
  return {
    buttonClicked,
    jrEastRealTimeLocateDataCallback,
    jrEastRealTimeInfoCallback,
    tokyoMetroRealTimeInfoCallback,
    RouteToHomeSite,
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    getMovieDialogOpen,
    setMovieDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
    openAllDialogs,
    changeLayerOrder,
    getLayers,
    getCardList,
    getIsDisplayLayer,
    setIsDisplayLayer,
    setOpacity,
  }
}
export default useViewSiteMain
