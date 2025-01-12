import { AxiosRequestConfig } from "axios"
import { getInstance, getInstanceLimited } from "@/infrastructure/axios/api"
import GtfsRealtimeBindings from "gtfs-realtime-bindings"
import JSZip from "jszip"

//apiからリクエスト用のインスタンスを持ってくる
const http = getInstance()
const httpLimited = getInstanceLimited()

const useReqRailwayData = () => {
  // 東京メトロの運行状況
  const reqTokyoMetroRealTimeInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_TOKYO_METRO_REALTIME_INFO_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await http.request(config)
      if (res.status === 200) {
        return res.data
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
  // 東京メトロの運行状況
  const reqToeiTrainRealTimeInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_TOEI_TRAIN_REALTIME_INFO_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await http.request(config)
      if (res.status === 200) {
        return res.data
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  // JR東日本の運行状況
  const reqJrEastRealTimeInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_JR_EAST_REALTIME_INFO_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_LIMITED
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await httpLimited.request(config)
      if (res.status === 200) {
        return res.data
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
  return {
    reqTokyoMetroRealTimeInfo,
    reqToeiTrainRealTimeInfo,
    reqJrEastRealTimeInfo,
  }
}

export default useReqRailwayData
