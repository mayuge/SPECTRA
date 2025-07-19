import { getInstance } from "@/infrastructure/axios/api"
import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"

export const useReqTrainApi = (): IReqTrainApi => {
  const instance = getInstance()

  /**
   * 駅一覧を取得
   * @returns any 駅の情報の配列
   */
  const getAllStation = async () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_TRAIN_STATION_URL
    const config = {
      method: "GET",
      url: `${url}`,
    }
    const res = await instance.request(config)
    if (res.status === 200) {
      return res.data
    } else {
      throw new Error("Failed to fetch station data")
    }
  }

  /**
   * 駅名から駅の情報を取得
   * @param stationName {string} 駅名
   * @returns 駅の情報
   */
  const getStationByName = async (stationName: string) => {
    const url = process.env.NEXT_PUBLIC_BACKEND_TRAIN_STATION_DETAIL_URL
    const config = {
      method: "GET",
      url: `${url}${stationName}`,
    }
    const res = await instance.request(config)
    if (res.status === 200) {
      return res.data
    } else {
      throw new Error(`Failed to fetch station data for ${stationName}`)
    }
  }

  return {
    getAllStation,
    getStationByName,
  }
}

export default useReqTrainApi
