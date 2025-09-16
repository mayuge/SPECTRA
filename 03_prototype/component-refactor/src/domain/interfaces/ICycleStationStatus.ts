// ステーションの状態を定義
export interface StationStatus {
  is_installed: boolean
  is_renting: boolean
  is_returning: boolean
  last_reported: number
  num_bikes_available: number
  num_docks_available: number
  station_id: string
}

export interface ICycleStationStatus {
  docomoBikeShareStationStatusArray: StationStatus[] // 配列で管理
  helloCycleStationStatusArray: StationStatus[] // 配列で管理
  setDocomoBikeShareStationStatusArray: (value: StationStatus[]) => void
  setHelloCycleStationStatusArray: (value: StationStatus[]) => void
  getDocomoBikeShareStationStatusObj: (stationId: string) => StationStatus | undefined
  getHelloCycleStationStatusObj: (stationId: string) => StationStatus | undefined
}
