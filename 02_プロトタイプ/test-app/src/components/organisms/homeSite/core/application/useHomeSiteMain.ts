import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { VIEW_SITE_ROOT_NAME,SOURCE_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
const useHomeSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
  //ボタンが押されたとき
  const buttonClicked = () => {
    alert("organisms/menuSite/core/application/useHomeSiteMainにある関数です。")
  }
  // ビューサイトに遷移する
  const navigateToViewSite = () => {
    routeTo(VIEW_SITE_ROOT_NAME)
  }
  // ソースサイトに遷移する
  const navigateToSourceSite = () => {
    routeTo(SOURCE_SITE_ROOT_NAME)
  }
  
  return {
    buttonClicked,
    navigateToViewSite,
    navigateToSourceSite,
  }
}
export default useHomeSiteMain
