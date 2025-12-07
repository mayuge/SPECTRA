import type { FeatureCollection } from "geojson"

export interface IGeojsonState {
  setGeojson: (geojson: FeatureCollection) => void
  getLastGeojson: () => FeatureCollection
  setColor: (color: string) => void
  getGeojsonColorbyIndex: (index: number) => string
}
