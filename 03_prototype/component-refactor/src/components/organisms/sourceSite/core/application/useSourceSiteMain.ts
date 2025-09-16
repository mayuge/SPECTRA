import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { VIEW_SITE_ROOT_NAME, HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
const useSourceSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
  //ボタンが押されたとき
  const buttonClicked = () => {
    alert("organisms/sourceSite/core/application/useSourceSiteMainにある関数です。")
  }
  // ビューサイトに遷移する
  const navigateToViewSite = () => {
    routeTo(VIEW_SITE_ROOT_NAME)
  }
  const navigateToHomeSite = () => {
    routeTo(HOME_SITE_ROOT_NAME)
  }

  return {
    buttonClicked,
    navigateToViewSite,
    navigateToHomeSite,
  }
}
export default useSourceSiteMain
