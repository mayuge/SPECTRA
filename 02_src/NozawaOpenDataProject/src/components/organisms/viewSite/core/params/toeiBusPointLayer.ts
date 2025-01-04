import type { GeoJSONSourceSpecification, SymbolLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

// GeoJSON ソース
const toeiBusSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/PointToeiBusStops.geojson",
}

const toeiBusSymbolLayer: LayerType = {
  id: "pointToeiBusSymbol",
  type: "symbol",
  sourceId: "pointToeiBus",
  source: toeiBusSource,
  layout: {
    "icon-image": "tokyoLogo",
    "icon-size": 0.12,
    "icon-allow-overlap": true,
    visibility: "visible",
    "text-field": ["get", "stop_name"], // テキストフィールドに駅名を設定
    "text-size": 10, // テキストサイズを設定
    "text-offset": [0, 1.0], // シンボルの少し上にテキストを配置
    "text-anchor": "top", // テキストアンカーを上に設定
  },
  paint: {
    "text-color": "#000000", // テキストの色を設定
    "text-halo-color": "#ffffff", // テキストの縁取りの色を設定
    "text-halo-width": 1, // テキストの縁取りの幅を設定
  },
  minzoom: 14,
  popup: {
    template: (properties: any) => {
      const div = document.createElement("div")
      div.innerHTML = `
        <div class="p-2">
          <iframe
            src="${properties.stop_url}"
            width="100%"
            height="auto"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
          <div class="flex items-center gap-2 mt-2">
            <img src="/assets/logos/tokyoLogo.webp" class="w-9 h-9">
            <h3 class="text-lg font-semibold">${properties.stop_name}</h3>
          </div>
        </div>
      `
      return div
    },
  },
}

export const toeiBusPointCard: CardListType = {
  logoImg: "/assets/logos/tokyoLogo.webp",
  text: "都営バス　バス停",
  dangerBadge: "交通",
  warningBadge: "地下鉄",
  primaryBadge: "ポイントデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: toeiBusSymbolLayer,
  
}
