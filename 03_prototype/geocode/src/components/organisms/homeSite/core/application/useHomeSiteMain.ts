import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { useModeStateStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
import { VIEW_SITE_ROOT_NAME, SOURCE_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
const useHomeSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
  const { setWalkModeSelected, setCycleModeSelected, setBusModeSelected, setTrainModeSelected } =
    useModeStateStoreAdapter()

  //交通モードに徒歩を選択し、ビューサイトに遷移
  const walkModeSelected = () => {
    setWalkModeSelected()
    navigateToViewSite()
  }
  //交通モードにサイクルを選択し、ビューサイトに遷移
  const cycleModeSelected = () => {
    setCycleModeSelected()
    navigateToViewSite()
  }

  //交通モードにバスを選択し、ビューサイトに遷移
  const busModeSelected = () => {
    setBusModeSelected()
    navigateToViewSite()
  }

  //交通モードに鉄道を選択し、ビューサイトに遷移
  const trainModeSelected = () => {
    setTrainModeSelected()
    navigateToViewSite()
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
    navigateToSourceSite,
    walkModeSelected,
    cycleModeSelected,
    busModeSelected,
    trainModeSelected,
  }
}
export default useHomeSiteMain
