import { getInstance, getInstanceLimited } from "@/infrastructure/axios/api"

//apiからリクエスト用のインスタンスを持ってくる
const http = getInstance()
const httpLimited = getInstanceLimited()

const useReqRailwayData = () => {
  //jr東日本の車両位置リアルタイムデータ
  const reqJrEastRealTimeData = async () => {
    try{
      const token = process.env.NEXT_PUBLIC_OPEN_DATA_CHALLENGE_TOKEN_LIMITED
      const config = {
        method: "GET",
        url: `gtfs/realtime/jreast_odpt_train_vehicle?acl:consumerKey=${token}`,
      }
      const res = await httpLimited.request(config)
      console.log(res)
    }catch(e:any){
      console.log(e)
    }
   
  }
  return {
    reqJrEastRealTimeData,
  }
}
export default useReqRailwayData
