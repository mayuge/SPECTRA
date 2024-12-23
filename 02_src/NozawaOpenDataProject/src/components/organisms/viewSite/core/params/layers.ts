import { CardListType } from "@/domain/types/cardListType"
import { LayerType } from "@/domain/types/layerType"
import  { RasterSourceSpecification, GeoJSONSourceSpecification } from "maplibre-gl"
export const cardList: CardListType[] = [
  {
    logoImg: "/assets/logos/jreast.webp",
    text: "JR東日本リアルタイム車両位置データ",
    dangerBadge: "交通データ",
    warningBadge: "鉄道",
    successBadge: "リアルタイム",
    primaryBadge: "ポイントデータ",
    darkBadge: "2024オープンデータチャレンジ限定",
    isShadow: false,
    shape: "square",
    isDisplayLayer: true,
    colorPickerClick: "buttonClicked",
    sliderClick: "buttonClicked",
    infoButtonClick: "jrEastRealTimeLocateDataCallback",
    displayButtonClick: "buttonClicked",
    orderButtonClick: "buttonClicked",
  },
  {
    logoImg: "/assets/logos/tokyometro.webp",
    text: "東京メトロリアルタイム運行状況データ",
    dangerBadge: "交通データ",
    warningBadge: "鉄道",
    successBadge: "リアルタイム",
    primaryBadge: "ラインデータ",
    isShadow: false,
    shape: "square",
    isDisplayLayer: false,
    colorPickerClick: "buttonClicked",
    sliderClick: "buttonClicked",
    infoButtonClick: "tokyoMetroRealTimeDataCallback",
    displayButtonClick: "buttonClicked",
    orderButtonClick: "buttonClicked",
  },
  {
    logoImg: "/assets/logos/soumusyou.webp",
    text: "2020年度国勢調査メッシュ",
    dangerBadge: "人口データ",
    warningBadge: "国勢調査",
    primaryBadge: "メッシュデータ",
    isShadow: false,
    shape: "square",
    isDisplayLayer: false,
    colorPickerClick: "buttonClicked",
    sliderClick: "buttonClicked",
    infoButtonClick: "openAllDialogs",
    displayButtonClick: "buttonClicked",
    orderButtonClick: "buttonClicked",
  },
]
// レイヤー定義オブジェクト（複数レイヤに対応）
export const layerObjects:  LayerType[] = [
  {
    id: "konjakumap",
    type: "raster",
    sourceId: "konjakumap",
    source: {
      type: "raster",
      tiles: ["https://ktgis.net/kjmapw/kjtilemap/tokyo50/03/{z}/{x}/{y}.png"],
      tileSize: 512,
      scheme: "tms",
      maxzoom: 16,
      minzoom: 8,
      attribution: "今昔マップ",
    } as RasterSourceSpecification,
    layout: {
      visibility: "visible",
    },
    paint: {
      "raster-opacity": 1,
    },
  },
  {
    id: "osm-map",
    type: "raster",
    sourceId: "osm-map",
    source: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png"],
      tileSize: 512,
      attribution: "OpenStreetMap",
    } as RasterSourceSpecification,
    layout: {
      visibility: "visible",
    },
    paint: {
      "raster-opacity": 1,
    },
  },
  {
    id: "polygon",
    type: "fill",
    sourceId: "BaseCityBlocks",
    source: {
      type: "geojson",
      data: "/geojson/Block_Tokyo_FeaturesToJSON.geojson",
    } as GeoJSONSourceSpecification,
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Capacity_面積"],
        0, "#f2f0f7",
        10, "#cbc9e2",
        20, "#9e9ac8",
        50, "#6a51a3"
      ],
      "fill-opacity": 0.7,
    },
  },
  {
    id: "line",
    type: "line",
    sourceId: "LineToeiBus",
    source: {
      type: "geojson",
      data: "/geojson/LineToeiBus.geojson",
    } as GeoJSONSourceSpecification,
    layout: {
      "line-join": "round",
      "line-cap": "round",
      visibility: "visible",
    },
    paint: {
      "line-color": "#00FF00",
      "line-width": 3,
      "line-opacity": 0.8,
    },
  },
]