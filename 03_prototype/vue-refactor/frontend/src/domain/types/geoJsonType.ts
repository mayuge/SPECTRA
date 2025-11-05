export type GeoJsonPointType = GeoJSON.FeatureCollection<GeoJSON.Point>
export type GeoJsonLineStringType = GeoJSON.FeatureCollection<GeoJSON.LineString>
export type GeoJsonPolygonType =
  | GeoJSON.FeatureCollection<GeoJSON.MultiPolygon>
  | GeoJSON.FeatureCollection<GeoJSON.MultiPolygon>

export type AllGeoJsonType = GeoJsonPointType | GeoJsonLineStringType | GeoJsonPolygonType
