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
    visibility: "visible",
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
        <h3>${properties.NAME || "名前なし"}</h3>
        <p><strong>面積:</strong> ${properties.SUM_AREA || "不明"} km²</p>
        <p><strong>市区町村:</strong> ${properties.SHICHO_NAME || properties.SHI_NAME || "不明"}</p>
        <p><strong>Capacity面積:</strong> ${properties.Capacity_面積 || "不明"}</p>
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
  text: "バスポリゴン",
  dangerBadge: "交通",
  warningBadge: "シェアサイクル",
  primaryBadge: "ポリゴンデータ",
  darkBadge: "オープンデータチャレンジ",
  isShadow: false,
  shape: "square",
  isDisplayLayer: true,
  infoButtonClick: "openAllDialogs",
  displayButtonClick: "buttonClicked",
  orderButtonClick: "changeLayerOrder",
  layer: busPolygonLayer,
}
