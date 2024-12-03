import { useTestStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
import { useRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
const useMenuSiteMain = () => {
  const { getCount } = useTestStoreAdapter()
  const { routeTo } = useRouteAdapter()
  //ボタンが押されたとき
  const buttonClicked = () => {
    alert("organisms/menuSite/core/application/useMenuSiteMainにある関数です。")
  }
  // ホームに遷移する
  const navigateToHomeSite = () => {
    routeTo(HOME_SITE_ROOT_NAME)
  }
  return {
    buttonClicked,
    navigateToHomeSite,
    getCount,
  }
}
export default useMenuSiteMain
