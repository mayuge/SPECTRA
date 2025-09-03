import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import Button from "@/components/atoms/buttons/Button"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"
import { baseSource, baseLayer } from "@/components/organisms/homeSite/core/layers/baseLayer"
import { gsiSource, gsiLayer } from "@/components/organisms/homeSite/core/layers/gsiLayer"
import { addTrainLineLayer } from "@/components/organisms/homeSite/core/layers/baseTrainLineLayer"
import { addTrainStationLayer } from "@/components/organisms/homeSite/core/layers/baseTrainStationLayer"
import { addAllGeojsonLayers } from "@/components/organisms/homeSite/core/layers/chatGeojsonLayer" // ←追加

const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6,
  zoom: 9,
  pitch: 0,
  bearing: 0,
  maxZoom: 15,
  minZoom: 6,
}

const MapApp = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const frameRef = useRef<number | null>(null)
  const { getScreenshot, getCurrentLocation } = useMapApp()
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)

  useEffect(() => {
    if (mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: {
        version: 8,
        sources: {
          base: baseSource,
          gsi: gsiSource,
        },
        layers: [baseLayer, ...gsiLayer],
        glyphs: "https://glyphs.geolonia.com/{fontstack}/{range}.pbf",
      },
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      maxZoom: INITIAL_VIEW_STATE.maxZoom,
      minZoom: INITIAL_VIEW_STATE.minZoom,
      pitch: INITIAL_VIEW_STATE.pitch,
      bearing: INITIAL_VIEW_STATE.bearing,
      attributionControl: false,
      renderWorldCopies: false,
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

    // --- 非同期で各レイヤ追加 ---
    ;(async () => {
      await addTrainLineLayer(map)
      await addTrainStationLayer(map)
      await addAllGeojsonLayers(map) // ←追加
    })()
  }, [])

  return (
    <div style={{ width: "100svw", height: "100svh", position: "relative" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 0 }}
      />
      <div className="absolute top-20 right-4 z-30 flex items-center gap-2">
        <Button
          variant="btn-dark"
          size="small"
          text="キャプチャ"
          shape="circle"
          iconLeft="photo_camera"
          onClick={() => getScreenshot(mapRef)}
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
