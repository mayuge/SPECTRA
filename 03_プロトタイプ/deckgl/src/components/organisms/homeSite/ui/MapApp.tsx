"use client"
import React from "react"
import DeckGL from "@deck.gl/react"

import Button from "@/components/atoms/buttons/Button"

import { plateauLayer } from "@/components/organisms/homeSite/core/params/plateauLayer"
import { floodHazardLayer } from "@/components/organisms/homeSite/core/params/floodHazardLayer"
import { satelliteLayer } from "@/components/organisms/homeSite/core/params/sateliteLayer"
import { trainLineLayer } from "@/components/organisms/homeSite/core/params/trainLineLayer"
import { osmLayer } from "@/components/organisms/homeSite/core/params/osmLayer"

import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"

const { handleScreenshot } = useMapApp()

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

function MapApp() {
  const deckRef = React.useRef<any>(null)

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
        controller={{
          touchRotate: true, // タッチ回転を有効化
          inertia: true, // 慣性スクロールを有効化
          touchZoom: true, // ピンチズームを有効化
          doubleClickZoom: true,
          keyboard: true, // キーボード操作を有効化
          dragRotate: true, // ドラッグ回転を有効化
        }}
        layers={[osmLayer, satelliteLayer, floodHazardLayer, trainLineLayer, plateauLayer]}
      />
      <div className="absolute top-[70px] right-4 z-10">
        <Button
          variant="btn-primary"
          size="normal"
          text=""
          shape="circle"
          iconLeft="photo_camera"
          onClick={() => {
            handleScreenshot(deckRef)
          }}
        />
      </div>
      <div className="absolute top-[142px] right-4 z-10">
        <Button
          variant="btn-primary"
          size="normal"
          text=""
          shape="circle"
          iconLeft="3d_rotation"
          onClick={() => {
            handleScreenshot(deckRef)
          }}
        />
      </div>
    </div>
  )
}

export default MapApp
