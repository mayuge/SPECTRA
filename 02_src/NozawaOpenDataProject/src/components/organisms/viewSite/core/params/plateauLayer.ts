import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import type { VectorSourceSpecification } from "maplibre-gl"

const plateauLayer: LayerType = {
  id: "building",
  type: "fill-extrusion",
  sourceId: "building",
  source: {
    type: "vector",
    tiles: ["https://indigo-lab.github.io/plateau-lod2-mvt/{z}/{x}/{y}.pbf"],
    tileSize: 512,
    maxzoom: 15,
    minzoom: 1,
  } as VectorSourceSpecification,
  "source-layer": "bldg",
  layout: {
    visibility: "visible",
  },
  paint: {
    "fill-extrusion-height": ["*", ["get", "z"], 1],
    "fill-extrusion-color": "#888",
    "fill-extrusion-opacity": 0.6,
  },
} as LayerType

export const plateauCard: CardListType = {
  logoImg: "/assets/logos/kokkousyou.webp",
  text: "PLATEAU",
  dangerBadge: "建物",
  warningBadge: "3D",
  primaryBadge: "3D建物ポリゴンデータ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  colorPickerClick: "buttonClicked",
  sliderClick: "buttonClicked",
  infoButtonClick: "openAllDialogs",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: plateauLayer,
}
