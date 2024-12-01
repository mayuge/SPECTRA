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
      console.log(res)
    } catch (e: any) {
      console.log(e)
    }
  }
  //東京メトロの運行状況リアルタイムデータ
  const reqTokyoMetroRealTimeData = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT
      const url = process.env.NEXT_PUBLIC_TOKYO_METRO_REALTIME_DATA_URL
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await http.request(config)
      console.log(res)
    } catch (e: any) {
      console.log(e)
    }
  }

  return {
    reqJrEastRealTimeLocateData,
    reqTokyoMetroRealTimeData,
  }
}
export default useReqRailwayData
