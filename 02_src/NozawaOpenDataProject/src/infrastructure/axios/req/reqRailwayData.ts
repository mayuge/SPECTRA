import {AxiosRequestConfig,ResponseType} from "axios"
import { getInstance, getInstanceLimited } from "@/infrastructure/axios/api"


//apiからリクエスト用のインスタンスを持ってくる
const http = getInstance()
const httpLimited = getInstanceLimited()

const useReqRailwayData = () => {
  //jr東日本の車両位置リアルタイムデータ
  const reqJrEastRealTimeLocateData = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_LIMITED
      const url = process.env.NEXT_PUBLIC_JR_EAST_REALTIME_LOCATE_DATA_URL
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await httpLimited.request(config)
      if (res.statusText === "OK") {
        return res.data
      }
    } catch (e: any) {
      console.log(e)
    }
  }
  //JR東日本の運行状況リアルタイムデータ
  // JR東日本の運行状況リアルタイムデータ
const reqJrEastRealTimeInfo = async () => {
  
};

  //東京メトロの運行状況リアルタイムデータ
  const reqTokyoMetroRealTimeInfo = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT
      const url = process.env.NEXT_PUBLIC_TOKYO_METRO_REALTIME_INFO_URL
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await http.request(config)
      if (res.statusText === "OK") {
        return res.data
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  return {
    reqJrEastRealTimeLocateData,
    reqJrEastRealTimeInfo,
    reqTokyoMetroRealTimeInfo,
  }
}
export default useReqRailwayData