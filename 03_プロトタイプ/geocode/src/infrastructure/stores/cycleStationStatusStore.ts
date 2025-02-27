import { create } from "zustand"
import { ICycleStationStatus } from "@/domain/interfaces/ICycleStationStatus"
// Zustand ストアの型を定義

// Zustand ストアを作成
const useCycleStationStatusStore = create<ICycleStationStatus>()((set, get) => ({
  docomoBikeShareStationStatusArray: [],
  helloCycleStationStatusArray: [],

  // Docomo のステーションデータを設定
  setDocomoBikeShareStationStatusArray: (value) =>
    set(() => ({
      docomoBikeShareStationStatusArray: value,
    })),

  // Hello のステーションデータを設定
  setHelloCycleStationStatusArray: (value) =>
    set(() => ({
      helloCycleStationStatusArray: value,
    })),

  // station_id に一致する Docomo のステーションデータを取得
  getDocomoBikeShareStationStatusObj: (stationId: string) => {
    return get().docomoBikeShareStationStatusArray.find(
      (station) => station.station_id === stationId
    )
  },

  // station_id に一致する Hello のステーションデータを取得
  getHelloCycleStationStatusObj: (stationId: string) => {
    return get().helloCycleStationStatusArray.find((station) => station.station_id === stationId)
  },
}))

export default useCycleStationStatusStore
