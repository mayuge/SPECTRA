import type { GeoJSONSourceSpecification } from "maplibre-gl"
import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

const slopePolygonLayer: LayerType = {
  id: "slopePolygon",
  type: "fill",
  sourceId: "slopePolygon",
  source: {
    type: "geojson",
    data: "/geojson/PolygonAverageSlopeAngleOver2deg.geojson",
  } as GeoJSONSourceSpecification,
  layout: {
    visibility: "visible",
  },
  paint: {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "AverageSlopeAngleRound"],
      2,
      "#FFAA00",
      5,
      "#734C00",
    ],
    "fill-opacity": 0.5,
  },
  popup: {
    template: (properties: any) => {
      // HTML要素を直接生成
      const div = document.createElement("div")
      div.innerHTML = `
        <div class="p-2">
          <iframe
            src="https://maps.google.co.jp/maps?output=embed&q=${properties.NAME }"
            width="100%"
            height="auto"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
          <div class="flex items-center gap-2 mt-2">
            <h3 class="text-lg font-semibold">${properties.NAME }</h3>
          </div>
           <div class="flex items-center gap-2 mt-2">
            <h5 class="text-sm">土地傾斜度（町丁目）${properties.AverageSlopeAngleRound}</h5>
          </div>
        </div>
      `
      return div // HTMLElementを返す
    },
    options: {
      maxWidth: "800px", // 最大幅
    },
  },
}

export const slopePolygonCard: CardListType = {
  logoImg: "/assets/logos/mountain.webp",
  text: "土地傾斜度（町丁目）",
  dangerBadge: "交通",
  warningBadge: "徒歩",
  primaryBadge: "ポリゴンデータ",
  darkBadge: "国土数値情報",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "openModeDialog",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: slopePolygonLayer,
}
