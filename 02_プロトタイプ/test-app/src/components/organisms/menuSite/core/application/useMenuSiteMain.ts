import { useTestStoreAdapter } from "@/infrastructure/adapters/storeAdapter"
const useMenuSiteMain = () => {
  const { getCount } = useTestStoreAdapter()
  const buttonClicked = () => {
    alert("button-clicked")
  }
  const navigateToHomeSite = () => {
    window.location.href = "/" // ホームに遷移する
  }
  return {
    buttonClicked,
    navigateToHomeSite,
    getCount,
  }
}
export default useMenuSiteMain
