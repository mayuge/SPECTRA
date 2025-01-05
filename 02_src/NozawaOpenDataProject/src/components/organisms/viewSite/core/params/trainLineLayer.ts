import type { GeoJSONSourceSpecification } from "maplibre-gl"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { trainLineParams } from "@/domain/params/trainLineParams"

// GeoJSON ソース
const trainSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/LineTrain.geojson",
}

const trainLineLayer: LayerType = {
  id: "lineTrain",
  type: "line",
  sourceId: "LineTrain",
  source: trainSource,
  layout: {
    "line-join": "round",
    "line-cap": "round",
    visibility: "visible",
  },
  paint: {
    "line-color": [
      "match",
      ["get", "N02_003"], // 路線名
      ...Object.entries(trainLineParams).flatMap(([line, { color }]) => [line, color]),
      "#808080", // デフォルト色（色が一致しない場合）
    ],
    "line-width": [
      "interpolate", // 線幅を補間する
      ["linear"],    // 線形補間
      ["zoom"],      // ズームレベルを基に補間
      10, 1,          // ズームレベル10で線幅2
      15, 10          // ズームレベル15で線幅10
    ],
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
  logoImg: "/assets/logos/kokkousyou.webp",
  text: "鉄道路線",
  dangerBadge: "交通",
  warningBadge: "鉄道",
  primaryBadge: "ラインデータ",
  darkBadge: "国土数値情報",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "buttonClicked",
  layer: trainLineLayer,
}
