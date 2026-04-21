import maplibregl from "maplibre-gl"
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
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import useMapInstance from "@/infrastructure/map/mapInstance"

/**
 * 地図プラグインを管理するインフラストラクチャ
 * @returns 各種プラグイン追加関数
 * @source
 */
const useMapPlugin = (): IMapPlugin => {
  const { getMapInstance } = useMapInstance() as IMapInstance
  const mapInstance = getMapInstance()

  const compassPlugin = () => {
    mapInstance.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: false,
        visualizePitch: true,
      }),
      "top-right"
    )
  }

  const locatePlugin = () => {
    mapInstance.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right"
    )
  }

  const scalePlugin = () => {
    mapInstance.addControl(
      new maplibregl.ScaleControl({ maxWidth: 200, unit: "metric" }),
      "bottom-right"
    )
  }

  const fullscreenPlugin = () => {
    mapInstance.addControl(new maplibregl.FullscreenControl(), "top-right")
  }

  const imgExportPlugin = () => {
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
    //@ts-ignore
    mapInstance.addControl(exportControl, "top-right")
  }

  const terrainPlugin = () => {
    mapInstance.addControl(
      new maplibregl.TerrainControl({ source: "terrain", exaggeration: 1.0 }),
      "top-right"
    )
  }



  const setAllPlugins = () => {
    scalePlugin()
    fullscreenPlugin()
    terrainPlugin()
    locatePlugin()
    imgExportPlugin()
    compassPlugin()
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
