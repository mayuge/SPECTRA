import axios from "axios"

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
      const data = res.data
      const features = data.data.stations.map((station: any) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [station.lon, station.lat],
        },
        properties: {
          name: station.name,
          address: station.address,
          station_id: station.station_id,
          rental_uris: station.rental_uris,
          parking_hoop: station.parking_hoop,
          parking_type: station.parking_type,
          contact_phone: station.contact_phone,
          vehicle_capacity: station.vehicle_capacity,
          is_charging_station: station.is_charging_station,
        },
      }))
      return features
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
      const data = res.data
      const features = data.data.stations.map((station: any) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [station.lon, station.lat],
        },
        properties: {
          name: station.name,
          station_id: station.station_id,
          region_id: station.region_id,
          vehicle_capacity: station.capacity,
        },
      }))
      return features
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
