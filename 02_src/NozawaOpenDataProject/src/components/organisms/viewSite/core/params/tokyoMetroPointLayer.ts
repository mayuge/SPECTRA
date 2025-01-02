import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import type { GeoJSONSourceSpecification } from "maplibre-gl"

const tokyoMetroSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/PointTokyoMetro.geojson",
}

const tokyoMetroSymbolLayer: LayerType = {
  id: "pointTokyoMetroSymbol",
  type: "symbol",
  sourceId: "pointTokyoMetro",
  source: tokyoMetroSource,
  layout: {
    "icon-image": "tokyoMetro",
    "icon-size": 0.12,
    "icon-allow-overlap": true,
    visibility: "visible",
  },
  minzoom: 12,
  popup: {
    template: (properties: any) => {
      const div = document.createElement("div")
      div.innerHTML = `

        
        <div class="p-2">
          <iframe
            src="https://maps.google.co.jp/maps?output=embed&q=${properties.stop_name}駅"
            width="100%"
            height="auto"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
          <div class="flex items-center gap-2 mt-2">
            <img src="/assets/logos/${properties.N05_002}.webp" alt="${properties.N05_002}" class="w-9 h-9">
            <h3 class="text-lg font-semibold">${properties.stop_name}駅</h3>
          </div>
        </div>

      `
      return div
    },
    options: {
      maxWidth: "400px",
    },
  },
}

export const tokyoMetroPointCard: CardListType = {
  logoImg: "/assets/logos/tokyoMetro.webp",
  text: "東京メトロ駅",
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
  layer: tokyoMetroSymbolLayer,
}
