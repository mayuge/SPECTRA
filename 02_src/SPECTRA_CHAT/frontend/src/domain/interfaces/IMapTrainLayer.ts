import type { FeatureCollection } from "geojson"
export interface IMapTrainLayer {
  addTrainStationLayer: (geojson: FeatureCollection) => void
  addTrainLineLayer: (geojson: FeatureCollection) => void
  toggleTrainLayer: () => void
  getTrainLayerVisibility: () => boolean
}
