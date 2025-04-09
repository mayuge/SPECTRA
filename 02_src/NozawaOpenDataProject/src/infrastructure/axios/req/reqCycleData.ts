import { getInstance } from "@/infrastructure/axios/api"
//apiからリクエスト用のインスタンスを持ってくる
const http = getInstance()
const useReqCycleData = () => {
  const reqHelloCycleStationInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_HELLO_CYCLE_STATION_INFO_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await http.request(config)

      return res.data.data.stations
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  const reqHelloCycleStationStatus = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_HELLO_CYCLE_STATION_STATUS_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await http.request(config)

      if (res.status === 200) {
        return res.data.data.stations
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const reqDocomoBikeShareStationInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_DOCOMO_BIKE_SHARE_STATION_INFO_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await http.request(config)
      return res.data.data.stations
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  const reqDocomoBikeShareStationStatus = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_DOCOMO_BIKE_SHARE_STATION_STATUS_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT
      const config = {
        method: "GET",
        url: `${url}${token}`,
      }
      //リクエストを行う
      const res = await http.request(config)

      if (res.status === 200) {
        return res.data.data.stations
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  return {
    reqHelloCycleStationInfo,
    reqHelloCycleStationStatus,
    reqDocomoBikeShareStationInfo,
    reqDocomoBikeShareStationStatus,
  }
}
export default useReqCycleData
