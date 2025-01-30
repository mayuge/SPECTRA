import type { GeoJSONSourceSpecification, SymbolLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

// GeoJSON ソース
const busSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/PointBusStopsKanto.geojson",
}

const busSymbolLayer: LayerType = {
  id: "pointbusSymbol",
  type: "symbol",
  sourceId: "pointbus",
  source: busSource,
  layout: {
    "icon-image": "busStop",
    "icon-size": 0.3,
    "icon-allow-overlap": true,
    visibility: "visible",
    "text-field": ["get", "stop_name"], // テキストフィールドに駅名を設定
    "text-size": 9, // テキストサイズを設定
    "text-offset": [0, 2.0], // シンボルの少し上にテキストを配置
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
            <img src="/assets/logos/busLogo.webp" class="w-9 h-9">
            <h3 class="text-lg font-semibold">${properties.stop_name}</h3>
          </div>
        </div>
      `
      return div
    },
  },
}

export const busPointCard: CardListType = {
  logoImg: "/assets/logos/busStop.webp",
  text: "バス停",
  dangerBadge: "交通",
  warningBadge: "バス",
  primaryBadge: "ポイントデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: busSymbolLayer,
}
