import type { RasterSourceSpecification, RasterLayerSpecification } from "maplibre-gl"

export const baseSource: RasterSourceSpecification = {
  type: "raster",
  tiles: ["https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"],
  tileSize: 512,
}

export const baseLayer: RasterLayerSpecification = {
  id: "base-raster",
  type: "raster",
  source: "base",
}
