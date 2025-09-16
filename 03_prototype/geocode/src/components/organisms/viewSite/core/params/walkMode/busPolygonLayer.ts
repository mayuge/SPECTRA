import type { GeoJSONSourceSpecification } from "maplibre-gl"
import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import type { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

const busPolygonLayer: LayerType = {
  id: "busPolygon",
  type: "fill",
  sourceId: "busPolygon",
  source: {
    type: "geojson",
    data: "/geojson/PolygonBusTripKanto.geojson",
  } as GeoJSONSourceSpecification,
  layout: {
    visibility: "none",
  },
  paint: {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "KantoBusTripCountPerArea"],
      0,
      "#ffd5ea",
      100,
      "#ffaad5",
      2500,
      "#ff55aa",
      20000,
      "#aa0055",
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
            src="https://maps.google.co.jp/maps?output=embed&q=${properties.NAME}"
            width="100%"
            height="auto"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
          <div class="flex items-center gap-2 mt-2">
            <h3 class="text-lg font-semibold">${properties.NAME}</h3>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <h5 class="text-sm">バス運行密度（運行本数/町丁目面積）${properties.KantoBusTripCountPerArea}</h5>
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

export const busPolygonCard: CardListType = {
  logoImg: "/assets/logos/busLogo.webp",
  text: "バス運行密度（運行本数/町丁目面積）",
  dangerBadge: "交通",
  warningBadge: "シェアサイクル",
  primaryBadge: "ポリゴンデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: false,
  infoButtonClick: "openModeDialog",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: busPolygonLayer,
}
