import type { GeoJsonPointType } from "@/domain/types/geoJsonType"
export interface IReqTrainApi {
  getAllStation: () => Promise<GeoJsonPointType>
  getStationByName: (stationName: string) => Promise<GeoJsonPointType>
}
