import type { FeatureCollection } from "geojson"
export interface IMapCustomLayer {
  addTrainStationLayer: (geojson: FeatureCollection) => void
  addTrainLineLayer: (geojson: FeatureCollection) => void
  addHelloCycleLayer: (geojson: FeatureCollection) => Promise<void>
  addDocomoBikeShareLayer: (geojson: FeatureCollection) => Promise<void>
  toggleCycleLayer: () => void
  toggleTrainLayer: () => void
  getCycleLayerVisibility: () => boolean
  getTrainLayerVisibility: () => boolean
}
