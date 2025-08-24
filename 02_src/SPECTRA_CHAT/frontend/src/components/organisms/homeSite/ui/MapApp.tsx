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
  bearing: 0,
  maxPitch: 90,
  maxZoom: 20,
  minZoom: 4,
}

const MapApp = () => {
  const deckRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const frameRef = useRef<number | null>(null)

  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)

  useEffect(() => {
    if (mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: {
        version: 8,
        sources: {
          gsi: {
            type: "vector",
            tiles: ["https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf"],
          },
        },
        layers: [
          {
            id: "gsi-station-label",
            type: "symbol",
            source: "gsi",
            "source-layer": "label",
            filter: ["all", ["==", "ftCode", 100], ["==", "annoCtg", 422]],
            layout: {
              "text-field": ["get", "knj"],
              "text-size": 12,
              "text-anchor": "top",
              // "text-rotate": ["get", "arrngAgl"],
              "text-pitch-alignment": "viewport",
              "text-rotation-alignment": "viewport",
            },
            paint: {
              "text-color": "#136145",
              "text-halo-color": "#fff",
              "text-halo-width": 1,
            },
          },
        ],
        glyphs: "https://glyphs.geolonia.com/{fontstack}/{range}.pbf",
      },
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      pitch: INITIAL_VIEW_STATE.pitch,
      bearing: INITIAL_VIEW_STATE.bearing,
      attributionControl: false,
    })

    mapRef.current = map

    map.on("move", () => {
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(() => {
        const center = map.getCenter()
        setViewState({
          longitude: center.lng,
          latitude: center.lat,
          zoom: map.getZoom(),
          pitch: map.getPitch(),
          bearing: map.getBearing(),
          maxZoom: INITIAL_VIEW_STATE.maxZoom,
          minZoom: INITIAL_VIEW_STATE.minZoom,
        })
        frameRef.current = null
      })
    })
  }, [])

  const flyToCurrentLocation = () => {
    if (!navigator.geolocation) return alert("ブラウザが位置情報に対応していません")

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          pitch: mapRef.current.getPitch(),
          bearing: mapRef.current.getBearing(),
        })
      },
      (err) => {
        alert("位置情報の取得に失敗しました")
        console.error(err)
      }
    )
  }

  return (
    <div style={{ width: "100svw", height: "100svh", position: "relative" }}>
      <DeckGL
        ref={deckRef}
        viewState={viewState}
        controller={false}
        useDevicePixels={false}
        layers={[gsiLayer, plateauLayer, baseTrainLineLayer, useStationLayer(), chatGeojsonLayer()]}
        style={{ position: "absolute", zIndex: "0", pointerEvents: "none" }}
      />
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 1 }}
      />

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
