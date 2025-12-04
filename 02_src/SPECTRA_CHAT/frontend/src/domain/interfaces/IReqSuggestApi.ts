export interface IReqSuggestApi {
  getSuggestData: (url: string) => Promise<GeoJSON.FeatureCollection>
}
