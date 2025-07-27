import type { GeoJsonPointType } from "@/domain/types/geoJsonType"
export interface IReqTrainApi {
  getAllStation: () => Promise<GeoJsonPointType>
  getStationByName: (stationName: string) => Promise<GeoJsonPointType>
  getAllTrainLine: () => Promise<GeoJsonPointType>
  getTrainLineByName: (lineName: string) => Promise<GeoJsonPointType>
}
