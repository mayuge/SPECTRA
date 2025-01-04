import {
  RasterSourceSpecification,
  GeoJSONSourceSpecification,
  RasterDEMSourceSpecification,
  VectorSourceSpecification,
} from "maplibre-gl"

export type PopupContent = {
  template: (properties: any) => HTMLElement // HTMLElementを返すように変更
  options?: object
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
    "text-field"?: any // テキストフィールドを追加
    "text-size"?: number // テキストサイズを追加
    "text-offset"?: [number, number] // テキストオフセットを追加
    "text-anchor"?:
      | "center"
      | "left"
      | "right"
      | "top"
      | "bottom"
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right" // テキストアンカーを追加
    "text-allow-overlap"?: boolean // テキストのオーバーラップを許可
    "text-max-width"?: number // テキストの最大幅を追加
    visibility: "visible" | "none"
  }
  paint?: object
  minzoom?: number // minzoomプロパティを追加
  maxzoom?: number // maxzoomプロパティを追加
  popup?: PopupContent // ポップアップの構造を具体的に定義
}
