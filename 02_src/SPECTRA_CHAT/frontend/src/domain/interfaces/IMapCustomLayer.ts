import type { FeatureCollection } from "geojson"
export interface IMapCustomLayer {
  trainStationLayer: (geojson: FeatureCollection) => void
  trainLineLayer: (geojson: FeatureCollection) => void
  helloCycleLayer: (geojson: FeatureCollection) => Promise<void>
  docomoBikeShareLayer: (geojson: FeatureCollection) => Promise<void>
  toggleCycleLayer: () => void
}
