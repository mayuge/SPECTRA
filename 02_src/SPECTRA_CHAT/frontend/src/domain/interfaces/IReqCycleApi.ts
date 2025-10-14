export interface IReqCycleApi {
  getHelloCycleStation: () => Promise<GeoJSON.FeatureCollection>
  getDocomoBikeShareStation: () => Promise<GeoJSON.FeatureCollection>
}
