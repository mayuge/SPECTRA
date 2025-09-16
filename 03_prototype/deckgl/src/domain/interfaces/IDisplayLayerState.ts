export interface IDisplayLayerState {
  layersObj: {
    osm: boolean
    satellite: boolean
    floodHazard: boolean
    train: boolean
    plateau: boolean
    trainLine: boolean
  }
  toggleDisplayLayer: (DisplayLayerName: keyof IDisplayLayerState["layersObj"]) => void
}
