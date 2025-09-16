import { useTestStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { VIEW_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
const useSourceSiteMain = () => {
  const { getCount } = useTestStoreAdapter()
  const { routeTo } = useSiteRouteAdapter()
  //ボタンが押されたとき
  const buttonClicked = () => {
    alert("organisms/sourceSite/core/application/useSourceSiteMainにある関数です。")
  }
  // ビューサイトに遷移する
  const navigateToViewSite = () => {
    routeTo(VIEW_SITE_ROOT_NAME)
  }
  return {
    buttonClicked,
    navigateToViewSite,
    getCount,
  }
}
export default useSourceSiteMain
