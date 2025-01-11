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
      0,
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

export const slopePolygonCard: CardListType = {
  logoImg: "/assets/logos/default.webp",
  text: "傾斜　ポリゴン",
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
  layer: slopePolygonLayer,
}
