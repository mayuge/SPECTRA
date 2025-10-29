export interface IMapLayer {
  addGeoJsonLayer: (mapInstance: any, layerId: string, geoJsonData: any) => void
  toggleLayer: (mapInstance: any, layerId: string) => void
}
