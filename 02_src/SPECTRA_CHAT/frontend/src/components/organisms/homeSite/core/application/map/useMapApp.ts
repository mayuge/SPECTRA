import { useEffect, useRef, useState } from "react"
import "@watergis/maplibre-gl-export/dist/maplibre-gl-export.css"
import maplibregl from "maplibre-gl"
import {
  MaplibreExportControl,
  Size,
  PageOrientation,
  Format,
  DPI,
} from "@watergis/maplibre-gl-export"
import { terrainSource } from "@/components/organisms/homeSite/core/layers/terrainLayer"
import { addTrainLineLayer } from "@/components/organisms/homeSite/core/layers/baseTrainLineLayer"
import { addTrainStationLayer } from "@/components/organisms/homeSite/core/layers/baseTrainStationLayer"
import { addAllGeojsonLayers } from "@/components/organisms/homeSite/core/layers/chatGeojsonLayer"
import { addHelloCycleStationLayer } from "@/components/organisms/homeSite/core/layers/helloCycleStationLayer"
import { addDocomoBikeShareStationLayer } from "@/components/organisms/homeSite/core/layers/docomoBikeShareStationLayer"
import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"

const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6,
  zoom: 9,
  pitch: 0,
  maxPitch: 85,
  bearing: 0,
  maxZoom: 20,
  minZoom: 5,
}

export const useMapApp = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)

  // ✅ displayLayerStore を監視
  const displayLayers = useDisplayLayerStore((state) => state.layersObj)

  useEffect(() => {
    if (mapRef.current) return
    if (!mapContainerRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "./map/style.json",
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      pitch: INITIAL_VIEW_STATE.pitch,
      maxPitch: INITIAL_VIEW_STATE.maxPitch,
      bearing: INITIAL_VIEW_STATE.bearing,
      maxZoom: INITIAL_VIEW_STATE.maxZoom,
      minZoom: INITIAL_VIEW_STATE.minZoom,
      attributionControl: false,
      renderWorldCopies: false,
      localIdeographFontFamily: "sans-serif",
    })
    mapRef.current = map

    // styleロード完了後
    map.on("style.load", () => {
      if (!map.getSource("terrain")) {
        map.addSource("terrain", terrainSource)
      }
      map.addControl(
        new maplibregl.TerrainControl({ source: "terrain", exaggeration: 1.0 }),
        "top-right"
      )
    })

    // 標準コントロール類
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }),
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
    map.addControl(new maplibregl.FullscreenControl(), "top-right")
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-right")

    // viewState更新
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

    // レイヤー読み込み
    const loadLayers = async () => {
      await addAllGeojsonLayers(map)
      await addTrainLineLayer(map)
      await addTrainStationLayer(map)
      await addHelloCycleStationLayer(map)
      await addDocomoBikeShareStationLayer(map)
    }
    loadLayers()
  }, [])

  // ✅ displayStore の変更を map に反映
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    Object.entries(displayLayers).forEach(([layerId, visible]) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, "visibility", visible ? "visible" : "none")
      }
    })
  }, [displayLayers])

  return {
    mapContainerRef,
    viewState,
    mapRef,
  }
}
