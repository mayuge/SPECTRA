import { getInstance } from "@/infrastructure/http/api"
import type { IReqBusApi } from "@/domain/interfaces/IReqBusApi"
export const useReqBusApi = (): IReqBusApi => {
  const httpInstance = getInstance()

  /**
   * 都営バスのバス停を取得
   * @returns {geojson}
   */
  const getToeiBusPoint = async () => {
    const url = import.meta.env.VITE_BUS_POINT_TOKYO_URL
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
   * 都営バスのバス路線を取得
   * @returns {geojson}
   */
  const getToeiBusLine = async () => {
    const url = import.meta.env.VITE_BUS_LINE_TOKYO_URL
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
    getToeiBusPoint,
    getToeiBusLine,
  }
}

export default useReqBusApi
