import type { GeoJSONSourceSpecification, LineLayerSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { trainLineParams } from "@/domain/params/trainLineParams"

// GeoJSON ソース
const tokyoMetroSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/LineTrain.geojson",
}

const trainLineLayer: LayerType = {
  id: "lineTokyoMetro",
  type: "line",
  sourceId: "LinetokyoMetro",
  source: tokyoMetroSource,
  layout: {
    "line-join": "round",
    "line-cap": "round",
    visibility: "visible",
  },
  paint: {
    "line-color": [
      "match",
      ["get", "N02_003"],
      ...Object.entries(trainLineParams).flatMap(([line, { color }]) => [line, color]),
      "#808080", // デフォルト色（色が一致しない場合）
    ],
    "line-width": 3,
    "line-opacity": 1,
  },
  popup: {
    template: (properties: any) => {
      const div = document.createElement("div")
      div.innerHTML = `
        <div class="p-2">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-semibold">${properties.N02_004}${properties.N02_003}</h3>
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

export const trainLineCard: CardListType = {
  logoImg: "/assets/logos/tokyoMetro.webp",
  text: "東京メトロ",
  dangerBadge: "交通",
  warningBadge: "地下鉄",
  primaryBadge: "ラインデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "tokyoMetroRealTimeInfoCallback",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: trainLineLayer,
}
