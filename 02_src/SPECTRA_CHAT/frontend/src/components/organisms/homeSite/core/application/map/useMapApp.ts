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
import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"

const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6,
  zoom: 9,
  pitch: 0,
  maxPitch: 85,
  bearing: 0,
  maxZoom: 20,
  minZoom: 6,
}

export const useMapApp = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
  const { toggleDisplayLayer, getDisplayLayer } = useDisplayLayerStore()

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

    map.on("style.load", () => {
      if (!map.getSource("terrain")) {
        map.addSource("terrain", terrainSource)
      }
      map.addControl(
        new maplibregl.TerrainControl({ source: "terrain", exaggeration: 1.0 }),
        "top-right"
      )
    })

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

    const loadLayers = async () => {
      await addTrainLineLayer(map)
      await addTrainStationLayer(map)
      await addAllGeojsonLayers(map)
    }
    loadLayers()
  }, [])

  // trainLineVisibleの変化でレイヤの表示/非表示を切り替える
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (!mapContainerRef.current) return

    if (!map.getLayer("base-train-line-layer")) return

    map.setLayoutProperty(
      "base-train-line-layer",
      "visibility",
      getDisplayLayer("trainLine") ? "visible" : "none"
    )
  }, [getDisplayLayer("trainLine")])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (!map.getLayer("base-train-station-layer")) return

    map.setLayoutProperty(
      "base-train-station-layer",
      "visibility",
      getDisplayLayer("train") ? "visible" : "none"
    )
  }, [getDisplayLayer("train")])

  return {
    mapContainerRef,
    viewState,
    mapRef,
  }
}
