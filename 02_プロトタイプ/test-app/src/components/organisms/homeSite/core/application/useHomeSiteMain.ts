import { useTestStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
import { useRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { VIEW_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
const useHomeSiteMain = () => {
  const { getCount } = useTestStoreAdapter()
  const { routeTo } = useRouteAdapter()
  //ボタンが押されたとき
  const buttonClicked = () => {
    alert("organisms/menuSite/core/application/useHomeSiteMainにある関数です。")
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
export default useHomeSiteMain
