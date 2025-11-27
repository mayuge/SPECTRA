export interface IReqBusApi {
  getToeiBusPoint: () => Promise<GeoJSON.FeatureCollection>
  getToeiBusLine: () => Promise<GeoJSON.FeatureCollection>
}
