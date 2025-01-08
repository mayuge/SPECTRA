import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import { companyLogoParams } from "@/domain/params/companyLogoParams"
import type { GeoJSONSourceSpecification } from "maplibre-gl"

const trainSource: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/geojson/PointTrain.geojson",
}

const trainSymbolLayer: LayerType = {
  id: "pointTrainSymbol",
  type: "symbol",
  sourceId: "pointTrain",
  source: trainSource,
  layout: {
    "icon-image": [
      "match",
      ["get", "N02_004"], // 会社
      ...Object.entries(companyLogoParams).flatMap(([line, { path }]) => [line, path]), // ロゴと会社名のペア
      "trainLogo", // デフォルトのロゴ
    ],
    "icon-size": 0.20,
    "icon-allow-overlap": true,
    visibility: "visible",
    "text-field": ["get", "N02_005"], // テキストフィールドに駅名を設定
    "text-size": 12, // テキストサイズを設定
    "text-offset": [0, 1.0], // シンボルの少し上にテキストを配置
    "text-anchor": "top", // テキストアンカーを上に設定
    "text-allow-overlap": true, // テキストのオーバーラップを許可
    "text-max-width": 300, // テキストの最大幅を設定
  },
  paint: {
    "text-color": "#ffffff", // テキストの色を設定
    "text-halo-color": "#000000", // テキストの縁取りの色を設定
    "text-halo-width": 1, // テキストの縁取りの幅を設定
  },
  minzoom: 14,
  popup: {
    template: (properties: any) => {
      const div = document.createElement("div")
      div.innerHTML = `
        <div class="p-2">
          <iframe
            src="https://maps.google.co.jp/maps?output=embed&q=${properties.N02_005}駅"
            width="100%"
            height="auto"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
          <div class="flex items-center gap-2 mt-2">
            <h3 class="text-lg font-semibold">${properties.N02_004}${properties.N02_005}駅</h3>
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

export const trainPointCard: CardListType = {
  logoImg: "/assets/logos/trainLogo.webp",
  text: "鉄道　駅",
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
  layer: trainSymbolLayer,
}
