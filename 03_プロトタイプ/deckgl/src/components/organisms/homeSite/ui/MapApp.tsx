"use client"
import React from "react"
import DeckGL from "@deck.gl/react"
import { TileLayer, MVTLayer } from "@deck.gl/geo-layers"
import { BitmapLayer, GeoJsonLayer } from "@deck.gl/layers"
import Button from "@/components/atoms/buttons/Button"
import { plateauLayer } from "@/components/organisms/homeSite/core/params/plateauLayer"

const INITIAL_VIEW_STATE = {
  longitude: 139.6917, // 東京の経度
  latitude: 35.6895, // 東京の緯度
  zoom: 15,
  pitch: 60, // 3D 表示のため視点を傾ける
  bearing: 0,
  maxZoom: 19,
  minZoom: 14,
  // 視点の制限を追加
  farZMultiplier: 10, // 描画距離の乗数
  nearZMultiplier: 0.1, // 近距離クリッピング
}

//ローカルにある鉄道路線のGeoJSONデータを読み込む
const geoJsonLayer = new GeoJsonLayer({
  id: "geojson-layer",
  data: "/geo/line/trainLineLayer.geojson",
  pickable: true,
  stroked: true,
  filled: false,
  extruded: true,
  lineWidthScale: 20,
  lineWidthMinPixels: 2,
  getLineColor: [128, 128, 200],
  getLineWidth: (f) => {
    return f.properties?.width || 1
  },
  getElevation: (f: any) => {
    return f.properties?.height || 0
  },
  elevationScale: true,
  updateTriggers: {
    getLineWidth: (f: any) => f.properties?.width,
    getElevation: (f: any) => f.properties?.height,
  },
})

// タイルのプロパティの型定義
const tileLayer = new TileLayer({
  id: "tile-layer",
  data: "https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png",
  minZoom: 0,
  maxZoom: 19,
  tileSize: 512,
  renderSubLayers: (props: any) => {
    const {
      bbox: { west, south, east, north },
    } = props.tile
    return new BitmapLayer({
      id: `${props.id}-bitmap`,
      image: props.data,
      bounds: [west, south, east, north],
      transparentColor: [0, 0, 0, 0],
      tintColor: [255, 255, 255],
    })
  },
})

// 衛星画像
const satelliteLayer = new TileLayer({
  id: "satellite-layer",
  data: "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
  minZoom: 0,
  maxZoom: 19,
  tileSize: 512,
  renderSubLayers: (props: any) => {
    const {
      bbox: { west, south, east, north },
    } = props.tile
    return new BitmapLayer({
      id: `${props.id}-bitmap`,
      image: props.data,
      bounds: [west, south, east, north],
      transparentColor: [0, 0, 0, 0],
      tintColor: [255, 255, 255],
    })
  },
})

// タイルのプロパティの型定義
const floodLayer = new TileLayer({
  id: "flood-layer",
  data: "	https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png",
  minZoom: 4,
  maxZoom: 19,
  tileSize: 512,
  // タイルエラー処理を追加
  onTileError: () => null,
  renderSubLayers: (props: any) => {
    const {
      bbox: { west, south, east, north },
    } = props.tile
    return new BitmapLayer({
      id: `${props.id}-bitmap`,
      image: props.data,
      bounds: [west, south, east, north],
      transparentColor: [0, 0, 0, 0],
      tintColor: [255, 255, 255],
    })
  },
})

// ...existing code...

function MapApp() {
  const deckRef = React.useRef<any>(null)

  const handleScreenshot = () => {
    if (!deckRef.current) return

    try {
      // DeckGLのキャンバスを直接取得
      const canvas = deckRef.current.deck.canvas
      const result = canvas.toDataURL("image/jpeg", 1.0)

      // ダウンロードリンクを作成
      const link = document.createElement("a")
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      link.download = `map-screenshot-${timestamp}.jpg`
      link.href = result
      link.click()
    } catch (error) {
      console.error("スクリーンショットの作成に失敗しました:", error)
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)",
        position: "relative",
      }}
    >
      <DeckGL
        ref={deckRef}
        initialViewState={{
          ...INITIAL_VIEW_STATE,
          maxPitch: 90,
        }}
        controller={true}
        layers={[tileLayer, floodLayer, geoJsonLayer, plateauLayer]}
      />
      <div className="absolute top-[70px] right-4 z-10">
        <Button
          variant="btn-primary"
          size="normal"
          text=""
          shape="circle"
          iconLeft="photo_camera"
          onClick={handleScreenshot}
        />
      </div>
      <div className="absolute top-[142px] right-4 z-10">
        <Button
          variant="btn-primary"
          size="normal"
          text=""
          shape="circle"
          iconLeft="3d_rotation"
          onClick={handleScreenshot}
        />
      </div>
    </div>
  )
}

export default MapApp
