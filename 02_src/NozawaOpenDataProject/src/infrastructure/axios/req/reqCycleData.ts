import { AxiosRequestConfig } from "axios"
import { getInstance, getInstanceLimited } from "@/infrastructure/axios/api"
import GtfsRealtimeBindings from "gtfs-realtime-bindings"
import JSZip from "jszip"

//apiからリクエスト用のインスタンスを持ってくる
const http = getInstance()
const httpLimited = getInstanceLimited()

const useReqCycleData = () => {
  // ハローサイクリング充電ステーション
  const reqHelloCycleStationInfo = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT
      const url = process.env.NEXT_PUBLIC_HELLO_CYCLE_STATION_INFO
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

  return {
    reqHelloCycleStationInfo,
  }
}

export default useReqCycleData
