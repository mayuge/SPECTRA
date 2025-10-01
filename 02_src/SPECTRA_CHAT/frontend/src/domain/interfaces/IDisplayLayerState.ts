export interface IDisplayLayerState {
  layersObj: {
    train: boolean
    trainLine: boolean
  }
  toggleDisplayLayer: (DisplayLayerName: keyof IDisplayLayerState["layersObj"]) => void
  getDisplayLayer: (DisplayLayerName: keyof IDisplayLayerState["layersObj"]) => boolean
}
