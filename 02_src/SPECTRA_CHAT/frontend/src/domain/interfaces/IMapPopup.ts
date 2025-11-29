export interface IMapPopup {
  addTrainStationHoverPopup: (layerId: string) => void
  addTrainLineHoverPopup: (layerId: string) => void
  addHoverPopup: (layerId: string) => void
  generateHoverHtml: (featureProperties: { [key: string]: any }) => string
}
