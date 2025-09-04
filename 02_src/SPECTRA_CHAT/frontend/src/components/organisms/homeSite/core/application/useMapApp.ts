import { useReqTrainApiAdapter } from "@/infrastructure/adapters/httpClientAdapters"

const useMapApp = () => {
  const { getAllStation, getStationByName, getAllTrainLine, getTrainLineByName } =
    useReqTrainApiAdapter()

  return {
    getAllStation,
    getStationByName,
    getAllTrainLine,
    getTrainLineByName,
  }
}

export default useMapApp
