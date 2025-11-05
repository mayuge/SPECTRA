import type { AllGeoJsonType } from "@/domain/types/geoJsonType"
export interface IGeojsonState {
  setGeojson: (geojson: AllGeoJsonType) => void
  getGeojson: () => AllGeoJsonType[]
}
