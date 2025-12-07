export interface IMapRasterLayer {
  addSatelliteLayer: () => void
  toggleSatelliteLayer: () => void
  getSatelliteLayerVisibility: () => boolean
  getFloodHazardLayerVisiblility: () => boolean
  toggleFloodHazardLayer: () => void
  addFloodHazardLayer: () => void
}
