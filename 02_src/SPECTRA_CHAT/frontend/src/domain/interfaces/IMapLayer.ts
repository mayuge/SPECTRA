export interface IMapLayer {
  addGeoJsonLayer: (geoJsonData: any) => void
  toggleLayer: (layerId: string) => void
  backToLayer: (layerId: string) => void
  frontToLayer: (layerId: string) => void
}
