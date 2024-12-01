import { useReqRailwayDataAdapter } from "@/infrastructure/adapters/httpReqAdapter"
const useHomeSiteMain = () => {
  const { reqJrEastRealTimeData } = useReqRailwayDataAdapter()
  const buttonClicked = async () => {
    await reqJrEastRealTimeData()
  }
  return {
    buttonClicked,
  }
}
export default useHomeSiteMain
