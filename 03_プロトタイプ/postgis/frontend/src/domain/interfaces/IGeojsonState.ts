import type { AllGeoJsonType } from "@/domain/types/geoJsonType"
export interface IGeojsonState {
  geojsonList: AllGeoJsonType[] // GeoJSONのリストを管理
  setGeojson: (geojson: AllGeoJsonType) => void
  getGeojson: () => AllGeoJsonType[]
}
