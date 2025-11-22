import type { FeatureCollection } from "geojson"
import type { CustomLayerNameType } from "@/domain/types/customLayerNameType"

export interface ICustomLayerState {
  setCustomLayerGeojson: (
    customLayerName: keyof CustomLayerNameType,
    geojson: FeatureCollection
  ) => void
  getCustomLayerGeojson: (customLayerName: keyof CustomLayerNameType) => FeatureCollection
}
