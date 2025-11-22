import type { GeoJsonPointType } from "@/domain/types/geoJsonType"
export interface IReqTrainApi {
  getAllTrainStation: () => Promise<GeoJsonPointType>
  getTrainStationByName: (stationName: string) => Promise<GeoJsonPointType>
  getAllTrainLine: () => Promise<GeoJsonPointType>
  getTrainLineByName: (lineName: string) => Promise<GeoJsonPointType>
}
