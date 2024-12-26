import {
  RasterSourceSpecification,
  GeoJSONSourceSpecification,
  RasterDEMSourceSpecification,
  FillExtrusionLayerSpecification,
  VectorSourceSpecification,
} from "maplibre-gl"

export type LayerType = {
  id: string
  type: string
  sourceId: string
  source: RasterSourceSpecification | GeoJSONSourceSpecification | RasterDEMSourceSpecification | VectorSourceSpecification,
  "source-layer"?: string,
  layout?: object
  paint?: object
}