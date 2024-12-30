import { AxiosRequestConfig} from "axios";
import { getInstance, getInstanceLimited } from "@/infrastructure/axios/api";
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

//apiからリクエスト用のインスタンスを持ってくる
const http = getInstance();
const httpLimited = getInstanceLimited();

const useReqRailwayData = () => {
  // JR東日本の車両位置リアルタイムデータ
  const reqJrEastRealTimeLocateData = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_LIMITED;
      const url = process.env.NEXT_PUBLIC_JR_EAST_REALTIME_LOCATE_DATA_URL;
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `${url}${token}`,
        responseType: "arraybuffer",
      };
      const res = await httpLimited.request(config);
      if (res.status === 200) {
        const buffer = new Uint8Array(res.data);
        return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
      }
    } catch (error) {
      if (error instanceof Error){
        throw new Error(error.message)
      }
    }
  };

  // JR東日本の運行状況リアルタイムデータ
  const reqJrEastRealTimeInfo = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_LIMITED;
      const url = process.env.NEXT_PUBLIC_JR_EAST_REALTIME_INFO_URL;
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `${url}${token}`,
        responseType: "arraybuffer",
      };
      const res = await httpLimited.request(config);
      if (res.status === 200) {
        const buffer = new Uint8Array(res.data);
        return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
      }
    } catch (error) {
      if (error instanceof Error){
        throw new Error(error.message)
      }
    }
  };

  // 東京メトロの運行状況リアルタイムデータ
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
  };
};

export default useReqRailwayData;


