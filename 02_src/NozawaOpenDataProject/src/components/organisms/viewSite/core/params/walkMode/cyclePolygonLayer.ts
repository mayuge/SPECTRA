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
