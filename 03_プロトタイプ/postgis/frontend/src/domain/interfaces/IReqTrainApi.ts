export interface IReqTrainApi {
  getAllStation: () => Promise<GeoJSON.FeatureCollection<GeoJSON.Point>>
  getStationByName: (stationName: string) => Promise<GeoJSON.FeatureCollection<GeoJSON.Point>>
}
