import { AxiosRequestConfig } from "axios"
import { getInstance, getInstanceLimited } from "@/infrastructure/axios/api"
import GtfsRealtimeBindings from "gtfs-realtime-bindings"
import JSZip from "jszip"

//apiからリクエスト用のインスタンスを持ってくる
const http = getInstance()
const httpLimited = getInstanceLimited()

const useReqRailwayData = () => {
  // JR東日本の車両位置リアルタイムデータ
  const reqJrEastRealTimeLocateData = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_JR_EAST_REALTIME_LOCATE_DATA_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_LIMITED
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `${url}${token}`,
        responseType: "arraybuffer",
      }
      const res = await httpLimited.request(config)
      if (res.status === 200) {
        const buffer = new Uint8Array(res.data)
        return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  // JR東日本の運行状況リアルタイムデータ
  const reqJrEastRealTimeInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_JR_EAST_REALTIME_INFO_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_LIMITED

      const config: AxiosRequestConfig = {
        method: "GET",
        url: `${url}${token}`,
        responseType: "arraybuffer",
      }
      const res = await httpLimited.request(config)
      if (res.status === 200) {
        const buffer = new Uint8Array(res.data)
        return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  // 東京メトロの運行状況
  const reqTokyoMetroRealTimeInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_JR_EAST_REALTIME_INFO_URL
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
  //東京メトロ駅情報
  const reqTokyoMetroStationInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_JR_EAST_REALTIME_INFO_URL
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
  // 都営地下鉄の運行状況
  const reqToeiTrainRealTimeInfo = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_TOEI_TRAIN_REALTIME_INFO_URL
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_DEFAULT

      const config: AxiosRequestConfig = {
        method: "GET",
        url: `${url}${token}`,
        responseType: "arraybuffer", // ZIPファイルを正しく取得
      }

      // リクエストを実行
      const res = await http.request(config)
      if (res.status === 200) {
        const zip = new JSZip()
        const unzipped = await zip.loadAsync(res.data) // ZIPデータを解凍
        const files = Object.keys(unzipped.files)
        const extractedData: Record<string, string> = {}
        for (const fileName of files) {
          if (unzipped.files[fileName].dir) continue // ディレクトリをスキップ
          const fileContent = await unzipped.files[fileName].async("string")
          extractedData[fileName] = fileContent
        }
        return extractedData // 各ファイル名と内容を返却
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  return {
    reqJrEastRealTimeLocateData,
    reqJrEastRealTimeInfo,
    reqTokyoMetroRealTimeInfo,
    reqTokyoMetroStationInfo,
    reqToeiTrainRealTimeInfo,
  }
}

export default useReqRailwayData
