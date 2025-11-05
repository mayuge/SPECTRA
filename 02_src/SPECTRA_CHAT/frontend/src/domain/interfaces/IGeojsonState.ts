import type { FeatureCollection } from "geojson"

export interface IGeojsonState {
  setGeojson: (geojson: FeatureCollection) => void
  getLastGeojson: () => FeatureCollection
}
