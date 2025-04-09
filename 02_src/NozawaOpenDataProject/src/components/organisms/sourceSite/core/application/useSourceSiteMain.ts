import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
const useSourceSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
  //ボタンが押されたとき
  const buttonClicked = () => {
    alert("organisms/sourceSite/core/application/useSourceSiteMainにある関数です。")
  }

  const navigateToHomeSite = () => {
    routeTo(HOME_SITE_ROOT_NAME)
  }

  return {
    buttonClicked,
    navigateToHomeSite,
  }
}
export default useSourceSiteMain
