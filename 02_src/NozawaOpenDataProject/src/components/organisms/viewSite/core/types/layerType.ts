import { RasterSourceSpecification, GeoJSONSourceSpecification, PropertyValueSpecification} from "maplibre-gl"
// レイヤーの型定義
export type LayerType = {
    id: string
    type: "raster" | "fill" | "line"
    sourceId: string
    source: RasterSourceSpecification | GeoJSONSourceSpecification
    layout?: {
      visibility?: "visible" | "none"
      "line-join"?: PropertyValueSpecification<"round" | "bevel" | "miter">
      "line-cap"?: PropertyValueSpecification<"butt" | "round" | "square">
    }
    paint: any
  }