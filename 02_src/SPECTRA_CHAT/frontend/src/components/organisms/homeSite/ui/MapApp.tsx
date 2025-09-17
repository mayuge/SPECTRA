import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
// @ts-expect-error
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

import { terrainSource } from "@/components/organisms/homeSite/core/layers/terrainLayer"
import { addTrainLineLayer } from "@/components/organisms/homeSite/core/layers/baseTrainLineLayer"
import { addTrainStationLayer } from "@/components/organisms/homeSite/core/layers/baseTrainStationLayer"
import { addAllGeojsonLayers } from "@/components/organisms/homeSite/core/layers/chatGeojsonLayer"

const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6,
  zoom: 9,
  pitch: 0,
  maxPitch: 90,
  bearing: 0,
  maxZoom: 20,
  minZoom: 6,
}

const MapApp = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)

  useEffect(() => {
    if (mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json",
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      pitch: INITIAL_VIEW_STATE.pitch,
      bearing: INITIAL_VIEW_STATE.bearing,
      maxZoom: INITIAL_VIEW_STATE.maxZoom,
      minZoom: INITIAL_VIEW_STATE.minZoom,
      attributionControl: false,
      renderWorldCopies: false,
    })
    mapRef.current = map

    map.on("style.load", () => {
      if (!map.getSource("terrain")) {
        map.addSource("terrain", terrainSource)
      }
      map.addControl(
        new maplibregl.TerrainControl({ source: "terrain", exaggeration: 1.0 }),
        "top-right"
      )
    })

    // コントロール類
    map.addControl(new CompassControl({ debug: false, visible: true }), "top-right")
    map.addControl(
      new MaplibreExportControl({
        PageSize: Size.A4,
        PageOrientation: PageOrientation.Landscape,
        Format: Format.PNG,
        DPI: DPI[300],
        Crosshair: true,
        PrintableArea: true,
        Local: "ja",
        attributionOptions: { visibility: "none" },
        northIconOptions: { visibility: "none" },
      }) as unknown as maplibregl.IControl,
      "top-right"
    )
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
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right"
    )
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }),
      "top-right"
    )
    map.addControl(new maplibregl.FullscreenControl(), "top-right")
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-right")

    map.on("move", () => {
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
    })

    // --- 非同期レイヤ追加 ---
    const loadLayers = async () => {
      await addTrainLineLayer(map)
      await addTrainStationLayer(map)
      await addAllGeojsonLayers(map)
    }
    loadLayers()
  }, [])

  return (
    <div style={{ width: "100svw", height: "100svh", position: "relative" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 0 }}
      />
      <div
        style={{ position: "absolute", bottom: 0, right: "120px", padding: 4, background: "#fff" }}
      >
        緯度: {viewState.latitude.toFixed(4)}, 経度: {viewState.longitude.toFixed(4)}, ズーム:{" "}
        {viewState.zoom.toFixed(2)}
      </div>
    </div>
  )
}

export default MapApp
