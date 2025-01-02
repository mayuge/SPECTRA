import type { GeoJSONSourceSpecification, SymbolLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

// GeoJSON ソース
const toeiSubwaySource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/PointToeiSubway.geojson",
}

const toeiSubwaySymbolLayer: LayerType = {
  id: "pointToeiSubwaySymbol",
  type: "symbol",
  sourceId: "pointToeiSubway",
  source: toeiSubwaySource,
  layout: {
    "icon-image": "tokyoLogo",
    "icon-size": 0.12,
    "icon-allow-overlap": true,
    visibility: "visible",
  },
  
  minzoom: 13,
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
            <img src="/assets/logos/tokyoLogo.webp" alt="${properties.N05_002}" class="w-9 h-9">
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

export const toeiSubwayPointCard: CardListType = {
  logoImg: "/assets/logos/tokyoLogo.webp",
  text: "都営地下鉄　駅",
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
  layer: toeiSubwaySymbolLayer,
  
}
