import type { FeatureCollection } from "geojson"
export interface IMapBusLayer {
  addToeiBusLineLayer: (geojson: FeatureCollection) => void
  addToeiBusPointLayer: (geojson: FeatureCollection) => void
  getBusLayerVisibility: () => boolean
  toggleBusLayer: () => void
}
