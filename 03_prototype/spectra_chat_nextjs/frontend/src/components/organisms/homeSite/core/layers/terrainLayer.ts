import type { RasterDEMSourceSpecification } from "maplibre-gl"

export const terrainSource: RasterDEMSourceSpecification = {
  type: "raster-dem",
  tiles: ["https://gbank.gsj.jp/seamless/elev/terrainRGB/land/{z}/{y}/{x}.png"],
  tileSize: 256,
  encoding: "mapbox",
  attribution: "産総研 陸地統合DEM",
}
