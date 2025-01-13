import type { GeoJSONSourceSpecification } from "maplibre-gl"
import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

const cyclePolygonLayer: LayerType = {
  id: "cyclePolygon",
  type: "fill",
  sourceId: "cyclePolygon",
  source: {
    type: "geojson",
    data: "/geojson/PolygonBycycleCapacityPerArea.geojson",
  } as GeoJSONSourceSpecification,
  layout: {
    visibility: "none",
  },
  paint: {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "BycycleCapacityPerArea"],
      0,
      "#F7FBFF",
      20,
      "#C6DBEF",
      50,
      "#6BAED6",
      100,
      "#2171B5",
      300,
      "#08306B",
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
            <h5 class="text-sm">シェアサイクル密度（駐輪台数/町丁目面積）${properties.BycycleCapacityPerArea}</h5>
          </div>
        </div>
      `
      return div // HTMLElementを返す
    },
    options: {
      maxWidth: "400px", // 最大幅
    },
  },
}
export const cyclePolygonCard: CardListType = {
  logoImg: "/assets/logos/bikeLogo.webp",
  text: "シェアサイクル密度（駐輪台数/町丁目面積）",
  dangerBadge: "交通",
  warningBadge: "シェアサイクル",
  primaryBadge: "ポリゴンデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: false,
  infoButtonClick: "buttonClicked",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: cyclePolygonLayer,
}
