import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { VIEW_SITE_ROOT_NAME, SOURCE_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
const useHomeSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()

  // ビューサイトに遷移する
  const navigateToViewSite = () => {
    routeTo(VIEW_SITE_ROOT_NAME)
  }
  // ソースサイトに遷移する
  const navigateToSourceSite = () => {
    routeTo(SOURCE_SITE_ROOT_NAME)
  }

  return {
    navigateToSourceSite,
    navigateToViewSite,
  }
}
export default useHomeSiteMain
