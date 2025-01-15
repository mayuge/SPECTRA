import { useReqRailwayDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
import { useDialogStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"

const useViewSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
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
    
  }

  // ホームサイトに遷移する関数
  const RouteToHomeSite = () => {
    routeTo(HOME_SITE_ROOT_NAME)
  }


  return {
    buttonClicked,
    RouteToHomeSite,
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    getMovieDialogOpen,
    setMovieDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
  }
}
export default useViewSiteMain
