import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
// @ts-ignore
import MeasuresControl from "maplibre-gl-measures"
import {
  MaplibreExportControl,
  Size,
  PageOrientation,
  Format,
  DPI,
} from "@watergis/maplibre-gl-export"
import "@watergis/maplibre-gl-export/dist/maplibre-gl-export.css"
import { CompassControl } from "maplibre-gl-compass"
import "maplibre-gl-compass/style.css"
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
  maxPitch: 90,
  bearing: 0,
  maxZoom: 15,
  minZoom: 6,
}

const MapApp = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const frameRef = useRef<number | null>(null)
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
        sky: {
          "sky-color": "#199EF3",
          "sky-horizon-blend": 0.5,
          "horizon-color": "#ffffff",
          "horizon-fog-blend": 0.5,
          "fog-color": "#0000ff",
          "fog-ground-blend": 0.5,
          "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 1, 10, 1, 12, 0],
        },
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

    const compass = new CompassControl({
      debug: false, // Show debug view. Default is false.
      visible: true, // Show compass button. Default is true.
      timeout: 10000, // The maximum time to wait for a DeviceOrientationEvent. Default is 3000 [ms].
    })
    map.addControl(compass)
    const exportControl = new MaplibreExportControl({
      PageSize: Size.A4,
      PageOrientation: PageOrientation.Landscape,
      Format: Format.PNG,
      DPI: DPI[300],
      Crosshair: true,
      PrintableArea: true,
      Local: "ja",
    })
    map.addControl(exportControl as unknown as maplibregl.IControl, "top-right")
    map.addControl(
      new MeasuresControl({
        lang: {
          areaMeasurementButtonTitle: "面積計測",
          lengthMeasurementButtonTitle: "距離計測",
          clearMeasurementsButtonTitle: "計測クリア",
        },
        units: "metric",
        style: {
          text: { color: "#0000FF", haloColor: "#fff", font: "Noto Sans CJK JP Bold" },
          areaMeasurement: {
            fillColor: "#0000FF",
            fillOutlineColor: "#0000FF",
            fillOpacity: 0.05,
            lineWidth: 2,
          },
          lengthMeasurement: { lineWidth: 2, lineColor: "#0000FF" },
        },
      }),
      "top-right"
    )

    // 位置情報ボタン
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right"
    )

    // 方位磁針ボタン（Compass）
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }),
      "top-right"
    )
    // 全画面ボタン
    map.addControl(new maplibregl.FullscreenControl(), "top-right")
    map.addControl(
      new maplibregl.ScaleControl({
        maxWidth: 100,
        unit: "metric",
      }),
      "bottom-right"
    )
    map.on("move", () => {
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(() => {
        const center = map.getCenter()
        setViewState({
          longitude: center.lng,
          latitude: center.lat,
          zoom: map.getZoom(),
          pitch: map.getPitch(),
          maxPitch: INITIAL_VIEW_STATE.maxPitch,
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
      await addAllGeojsonLayers(map)
    })()
  }, [])

  return (
    <div style={{ width: "100svw", height: "100svh", position: "relative" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 0 }}
      />
    </div>
  )
}

export default MapApp
