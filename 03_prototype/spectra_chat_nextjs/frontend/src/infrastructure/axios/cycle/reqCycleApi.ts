import { getInstance } from "@/infrastructure/axios/api"
import type { IReqCycleApi } from "@/domain/interfaces/IReqCycleApi"
export const useReqCycleApi = (): IReqCycleApi => {
  const httpInstance = getInstance()

  /**
   * HELLO CYCLINGのステーション情報を取得
   * @returns {geojson}
   */
  const getHelloCycleStation = async () => {
    const url = process.env.NEXT_PUBLIC_HELLO_CYCLE_STATION_URL
    const config = {
      method: "GET",
      url: `${url}`,
    }
    const res = await httpInstance.request(config)
    if (res.status === 200) {
      return typeof res.data === "string" ? JSON.parse(res.data) : res.data
    } else {
      throw new Error("Failed to fetch station data")
    }
  }
  /**
   * ドコモ・バイクシェアのステーション情報を取得
   * @returns {geojson}
   */
  const getDocomoBikeShareStation = async () => {
    const url = process.env.NEXT_PUBLIC_DOCOMO_BIKE_SHARE_STATION_URL
    const config = {
      method: "GET",
      url: `${url}`,
    }
    const res = await httpInstance.request(config)
    if (res.status === 200) {
      return typeof res.data === "string" ? JSON.parse(res.data) : res.data
    } else {
      throw new Error("Failed to fetch station data")
    }
  }

  return {
    getHelloCycleStation,
    getDocomoBikeShareStation,
  }
}

export default useReqCycleApi
