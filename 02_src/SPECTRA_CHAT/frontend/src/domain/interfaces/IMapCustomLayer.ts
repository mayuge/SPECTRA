import type { FeatureCollection } from "geojson"
export interface IMapCustomLayer {
  addTrainStationLayer: (geojson: FeatureCollection) => void
  addTrainLineLayer: (geojson: FeatureCollection) => void
  addHelloCycleLayer: (geojson: FeatureCollection) => Promise<void>
  addDocomoBikeShareLayer: (geojson: FeatureCollection) => Promise<void>
  addToeiBusLineLayer: (geojson: FeatureCollection) => void
  addToeiBusPointLayer: (geojson: FeatureCollection) => void
  toggleCycleLayer: () => void
  toggleTrainLayer: () => void
  toggleBusLayer: () => void
  getCycleLayerVisibility: () => boolean
  getTrainLayerVisibility: () => boolean
  getBusLayerVisibility: () => boolean
}
