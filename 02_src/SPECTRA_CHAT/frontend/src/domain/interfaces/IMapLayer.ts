export interface IMapLayer {
  addGeoJsonLayer: (geoJsonData: any) => void
  toggleLayer: (layerId: string) => void
}
