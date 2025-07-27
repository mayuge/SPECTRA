import { getInstance } from "@/infrastructure/axios/api"
import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"
export const useReqTrainApi = (): IReqTrainApi => {
  const httpInstance = getInstance()

  /**
   * 駅一覧を取得
   * @returns {geojson} 駅の情報
   */
  const getAllStation = async () => {
    const url = process.env.NEXT_PUBLIC_TRAIN_STATION_URL
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
   * 駅名から駅の情報を取得
   * @param stationName {string} 駅名
   * @returns {geojson} 駅の情報
   */
  const getStationByName = async (stationName: string) => {
    const url = process.env.NEXT_PUBLIC_TRAIN_STATION_DETAIL_URL
    const config = {
      method: "GET",
      url: `${url}${stationName}`,
    }
    const res = await httpInstance.request(config)
    if (res.status === 200) {
      return typeof res.data === "string" ? JSON.parse(res.data) : res.data
    } else {
      throw new Error(`Failed to fetch station data for ${stationName}`)
    }
  }

  /**
   * 鉄道路線の情報を取得
   * @returns {geojson} 鉄道路線の情報
   */
  const getAllTrainLine = async () => {
    const url = process.env.NEXT_PUBLIC_TRAIN_LINE_URL
    const config = {
      method: "GET",
      url: `${url}`,
    }
    const res = await httpInstance.request(config)
    if (res.status === 200) {
      return typeof res.data === "string" ? JSON.parse(res.data) : res.data
    } else {
      throw new Error("Failed to fetch line data")
    }
  }

  /**
   * 鉄道路線名から鉄道路線の情報を取得
   * @param lineName {string} 鉄道路線名
   * @returns {geojson} 鉄道路線の情報
   */
  const getTrainLineByName = async (lineName: string) => {
    const url = process.env.NEXT_PUBLIC_TRAIN_LINE_DETAIL_URL
    const config = {
      method: "GET",
      url: `${url}${lineName}`,
    }
    const res = await httpInstance.request(config)
    if (res.status === 200) {
      console.log(res.data)
      return typeof res.data === "string" ? JSON.parse(res.data) : res.data
    } else {
      throw new Error(`Failed to fetch line data for ${lineName}`)
    }
  }

  return {
    getAllStation,
    getStationByName,
    getAllTrainLine,
    getTrainLineByName,
  }
}

export default useReqTrainApi
