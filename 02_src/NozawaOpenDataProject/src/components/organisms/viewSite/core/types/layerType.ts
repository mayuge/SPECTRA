import {
  RasterSourceSpecification,
  GeoJSONSourceSpecification,
  RasterDEMSourceSpecification,
  PropertyValueSpecification,
} from "maplibre-gl"
// レイヤーの型定義
export type LayerType = {
  id: string
  type: "raster" |"raster-dem"| "fill" | "line"|"hillshade"
  sourceId: string
  source: RasterSourceSpecification | GeoJSONSourceSpecification | RasterDEMSourceSpecification
  layout?: {
    visibility?: "visible" | "none"
    "line-join"?: PropertyValueSpecification<"round" | "bevel" | "miter">
    "line-cap"?: PropertyValueSpecification<"butt" | "round" | "square">
  }
  paint: any
}
