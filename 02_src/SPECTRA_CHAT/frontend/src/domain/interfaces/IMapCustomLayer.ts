import type { FeatureCollection } from "geojson"
export interface IMapCustomLayer {
  trainStationLayer: (geojson: FeatureCollection) => void
  trainLineLayer: (geojson: FeatureCollection) => void
}
