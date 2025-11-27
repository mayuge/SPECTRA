import type { FeatureCollection } from "geojson"
export interface IMapCycleLayer {
  addHelloCycleLayer: (geojson: FeatureCollection) => Promise<void>
  addDocomoBikeShareLayer: (geojson: FeatureCollection) => Promise<void>
  toggleCycleLayer: () => void
  getCycleLayerVisibility: () => boolean
}
