import {
  RasterSourceSpecification,
  GeoJSONSourceSpecification,
  RasterDEMSourceSpecification,
  VectorSourceSpecification,
} from "maplibre-gl"

export type PopupContent = {
  template: (properties: any) => HTMLElement // HTMLElementを返すように変更
  options?: {
    maxWidth?: string // 最大幅などのオプションも追加可能
  }
}

export type LayerType = {
  id: string
  type:
    | "symbol"
    | "fill"
    | "line"
    | "circle"
    | "heatmap"
    | "fill-extrusion"
    | "raster"
    | "hillshade"
    | "background"
  sourceId: string
  source:
    | RasterSourceSpecification
    | GeoJSONSourceSpecification
    | RasterDEMSourceSpecification
    | VectorSourceSpecification
  "source-layer"?: string
  layout: {
    "line-join"?: "bevel" | "round" | "miter"
    "line-cap"?: "butt" | "round" | "square"
    "icon-image"?: string
    "icon-size"?: number
    "icon-allow-overlap"?: boolean
    visibility: "visible" | "none"
  }
  paint?: object
  popup?: PopupContent // ポップアップの構造を具体的に定義
}
