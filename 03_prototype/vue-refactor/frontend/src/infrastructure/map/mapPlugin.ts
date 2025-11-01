import maplibregl, { Map } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import {
  MaplibreExportControl,
  Size,
  PageOrientation,
  Format,
  DPI,
} from "@watergis/maplibre-gl-export"
import "@watergis/maplibre-gl-export/dist/maplibre-gl-export.css"
import type { IMapPlugin } from "@/domain/interfaces/IMapPlugin"

const useMapPlugin = (): IMapPlugin => {
  const compassPlugin = (map: Map) => {
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true, showZoom: true }),
      "top-right"
    )
  }

  const locatePlugin = (map: Map) => {
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right"
    )
  }

  const scalePlugin = (map: Map) => {
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 200, unit: "metric" }), "bottom-right")
  }

  const fullscreenPlugin = (map: Map) => {
    map.addControl(new maplibregl.FullscreenControl(), "top-right")
  }

  const imgExportPlugin = (map: Map) => {
    const exportControl = new MaplibreExportControl({
      PageSize: Size.A4,
      PageOrientation: PageOrientation.Landscape,
      Format: Format.PNG,
      DPI: DPI[300],
      Crosshair: true,
      PrintableArea: true,
      Local: "ja",
      attributionOptions: { visibility: "none" },
      northIconOptions: { visibility: "none" },
    })
    map.addControl(exportControl, "top-right")
  }

  const terrainPlugin = (map: Map) => {
    map.addControl(
      new maplibregl.TerrainControl({ source: "terrain", exaggeration: 1.0 }),
      "top-right"
    )
  }

  const setAllPlugins = (map: Map) => {
    compassPlugin(map)
    scalePlugin(map)
    locatePlugin(map)
    fullscreenPlugin(map)
    imgExportPlugin(map)
    terrainPlugin(map)
  }
  return {
    compassPlugin,
    scalePlugin,
    locatePlugin,
    fullscreenPlugin,
    imgExportPlugin,
    terrainPlugin,
    setAllPlugins,
  }
}

export default useMapPlugin
