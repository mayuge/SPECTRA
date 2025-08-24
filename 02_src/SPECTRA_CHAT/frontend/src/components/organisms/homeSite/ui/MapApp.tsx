"use client"
import React, { useEffect, useRef, useState } from "react"
import DeckGL from "@deck.gl/react"
import maplibregl from "maplibre-gl"
import type { MapViewState } from "@deck.gl/core"

import Button from "@/components/atoms/buttons/Button"
import { plateauLayer } from "@/components/organisms/homeSite/core/layers/plateauLayer"
import { baseTrainLineLayer } from "@/components/organisms/homeSite/core/layers/baseTrainLineLayer"
import { gsiLayer } from "@/components/organisms/homeSite/core/layers/osmLayer"
import { useStationLayer } from "@/components/organisms/homeSite/core/layers/baseTrainStationLayer"
import { chatGeojsonLayer } from "@/components/organisms/homeSite/core/layers/chatGeojsonLayer"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"

const { getScreenshot } = useMapApp()

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 139.6917,
  latitude: 36.0,
  zoom: 5,
  pitch: 50,
  maxPitch: 90,
  bearing: 0,
  maxZoom: 20,
  minZoom: 4,
  farZMultiplier: 10,
  nearZMultiplier: 0.1,
}

const MapApp = () => {
  const deckRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)

  // MapLibre 初期化
  useEffect(() => {
    if (mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "https://tiles.kmproj.com/styles/osm-ja-light.json",
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      pitch: INITIAL_VIEW_STATE.pitch,
      bearing: INITIAL_VIEW_STATE.bearing,
      attributionControl: false,
    })

    mapRef.current = map

    map.on("load", () => {
      // 日本全域 DEM
      map.addSource("terrain", {
        type: "raster-dem",
        tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
        encoding: "terrarium",
        tileSize: 256,
        minzoom: 0,
        maxzoom: 14,
      })

      // 3D地形を有効化
      map.setTerrain({ source: "terrain", exaggeration: 1 })

      // optional: hillshadeで凹凸強調
      map.addLayer({
        id: "hillshade",
        type: "hillshade",
        source: "terrain",
        layout: {},
        paint: {
          "hillshade-illumination-anchor": "map",
          "hillshade-exaggeration": 0.1,
        },
      })
    })

    // MapLibre 主導で DeckGL を追従
    map.on("move", () => {
      const center = map.getCenter()
      setViewState({
        longitude: center.lng,
        latitude: center.lat,
        zoom: map.getZoom(),
        pitch: map.getPitch(),
        bearing: map.getBearing(),
        maxZoom: INITIAL_VIEW_STATE.maxZoom,
        minZoom: INITIAL_VIEW_STATE.minZoom,
        farZMultiplier: INITIAL_VIEW_STATE.farZMultiplier,
        nearZMultiplier: INITIAL_VIEW_STATE.nearZMultiplier,
      })
    })
  }, [])

  // 現在地に飛ぶ
  const flyToCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("ブラウザが位置情報に対応していません")
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords

        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            pitch: mapRef.current.getPitch(),
            bearing: mapRef.current.getBearing(),
          })
          // setViewState は不要
        }
      },
      (err) => {
        alert("位置情報の取得に失敗しました")
        console.error(err)
      }
    )
  }

  return (
    <div style={{ width: "100svw", height: "100svh", position: "relative" }}>
      {/* MapLibre ベースマップ */}
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 0 }}
      />

      {/* DeckGL オーバーレイ */}
      <DeckGL
        ref={deckRef}
        viewState={viewState}
        controller={false} // DeckGL 操作は無効
        useDevicePixels={false}
        layers={[gsiLayer, plateauLayer, baseTrainLineLayer, useStationLayer(), chatGeojsonLayer()]}
        style={{ position: "absolute", zIndex: "1", pointerEvents: "none" }}
      />

      {/* ボタン類 */}
      <div className="absolute top-20 right-4 z-30 flex items-center gap-2">
        <Button
          variant="btn-dark"
          size="small"
          text="キャプチャ"
          shape="circle"
          iconLeft="photo_camera"
          onClick={() => getScreenshot(deckRef)}
        />
        <Button
          variant="btn-dark"
          size="small"
          text="現在地"
          shape="circle"
          iconLeft="my_location"
          onClick={flyToCurrentLocation}
        />
      </div>
    </div>
  )
}

export default MapApp
