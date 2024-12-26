import {
  RasterSourceSpecification,
  GeoJSONSourceSpecification,
  RasterDEMSourceSpecification,
  VectorSourceSpecification,
} from "maplibre-gl"

export type LayerType = {
  id: string
  type: "symbol" | "fill" | "line" | "circle" | "heatmap" | "fill-extrusion" | "raster" | "hillshade" | "background"
  sourceId: string
  source: RasterSourceSpecification | GeoJSONSourceSpecification | RasterDEMSourceSpecification | VectorSourceSpecification
  "source-layer"?: string
  layout: {
    "line-join"?: "bevel" | "round" | "miter"
    "line-cap"?: "butt" | "round" | "square"
    visibility: "visible" | "none"
  }
  paint?: object
}