import type { Feature, FeatureCollection } from "geojson"
export interface IGeoProcessing {
  intersectGeojson: (main: FeatureCollection, sub: FeatureCollection) => FeatureCollection
  intersectFeature: (main: Feature, sub: Feature) => Feature | null
}
