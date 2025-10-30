export interface IMapLayer {
  addGeoJsonLayer: (mapInstance: any, geoJsonData: any) => void
  toggleLayer: (mapInstance: any, layerId: string) => void
}
