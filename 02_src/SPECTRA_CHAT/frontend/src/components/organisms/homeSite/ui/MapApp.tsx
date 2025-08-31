"use client"

import React, { useEffect, useRef, useState } from "react"
import DeckGL from "@deck.gl/react"
import maplibregl from "maplibre-gl"
import type { MapViewState } from "@deck.gl/core"

import Button from "@/components/atoms/buttons/Button"
import { plateauLayer } from "@/components/organisms/homeSite/core/layers/plateauLayer"
import { baseTrainLineLayer } from "@/components/organisms/homeSite/core/layers/baseTrainLineLayer"
import { gsiLayer, osmLayer } from "@/components/organisms/homeSite/core/layers/osmLayer"
import { useStationLayer } from "@/components/organisms/homeSite/core/layers/baseTrainStationLayer"
import { chatGeojsonLayer } from "@/components/organisms/homeSite/core/layers/chatGeojsonLayer"
import {
  gsiTextSource,
  gsiStationLayer,
  gsiTownLayer,
  gsiCityLayer,
  gsiBigCityLayer,
} from "@/components/organisms/homeSite/core/layers/gsiTextLayer"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"

const { getScreenshot, getCurrentLocation } = useMapApp()

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
          gsi: gsiTextSource,
        },
        layers: [gsiStationLayer, gsiTownLayer, gsiCityLayer, gsiBigCityLayer],
        glyphs: "https://glyphs.geolonia.com/{fontstack}/{range}.pbf",
      },
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      pitch: INITIAL_VIEW_STATE.pitch,
      bearing: INITIAL_VIEW_STATE.bearing,
      attributionControl: false,
      renderWorldCopies: false,
    })

    mapRef.current = map

    // move中は rAF で更新
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

  return (
    <div style={{ width: "100svw", height: "100svh", position: "relative" }}>
      <DeckGL
        ref={deckRef}
        viewState={viewState}
        controller={false}
        useDevicePixels={true}
        layers={[
          osmLayer,
          gsiLayer,
          plateauLayer,
          baseTrainLineLayer,
          useStationLayer(),
          chatGeojsonLayer(),
        ]}
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
          onClick={() => getCurrentLocation(mapRef)}
        />
      </div>
    </div>
  )
}

export default MapApp
