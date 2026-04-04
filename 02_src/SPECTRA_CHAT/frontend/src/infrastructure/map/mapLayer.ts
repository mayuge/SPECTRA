import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { FeatureCollection, Feature, Geometry } from "geojson"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPopup } from "@/domain/interfaces/IMapPopup"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"

import maplibregl from "maplibre-gl"
import { bbox } from "@turf/turf"

import useMapInstance from "@/infrastructure/map/mapInstance"
import useMapPopup from "@/infrastructure/map/mapPopup"
import { useGeojsonStateStore } from "@/infrastructure/stores/geojsonStateStore"

import { TRAIN_LINE_LAYER, TRAIN_STATION_LAYER } from "@/domain/params/customLayerName"
/**
 * 地図レイヤー管理のインフラストラクチャ
 * @returns レイヤー管理関数
 * @source
 */
const useMapLayer = (): IMapLayer => {
  let layerCounter = 0
  const colorMap = new Map<string, string>() // layerId → color

  const generateLayerId = () => `geojson-layer-${layerCounter++}`

  const generateRandomColor = (): string => {
    const r = Math.floor(Math.random() * 128) + 64
    const g = Math.floor(Math.random() * 128) + 64
    const b = Math.floor(Math.random() * 128) + 64
    return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`
  }

  const getLayerColor = (layerId: string, sharedColor: string): string => {
    if (!colorMap.has(layerId)) {
      colorMap.set(layerId, sharedColor)
    }
    return colorMap.get(layerId)!
  }

  const waitForSource = (map: maplibregl.Map, sourceId: string) =>
    new Promise<void>((resolve) => {
      if (map.getSource(sourceId)) return resolve()
      map.once("sourcedata", () => resolve())
    })

  const addLayer = async (
    layerId: string,
    featureCollection: FeatureCollection<Geometry>,
    type: "Point" | "LineString" | "Polygon",
    sharedColor: string
  ) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const { addHoverPopup } = useMapPopup() as IMapPopup
    const { setColor } = useGeojsonStateStore() as IGeojsonState
    const mapInstance = getMapInstance()

    const color = getLayerColor(layerId, sharedColor)
    setColor(color)

    if (mapInstance.getSource(layerId)) {
      ;(mapInstance.getSource(layerId) as any).setData(featureCollection)
      return
    }

    mapInstance.addSource(layerId, { type: "geojson", data: featureCollection })
    await waitForSource(mapInstance, layerId)
    switch (type) {
      case "Point":
        mapInstance.addLayer({
          id: layerId,
          type: "circle",
          source: layerId,
          paint: {
            "circle-color": color,
            "circle-radius": 6,
            "circle-stroke-width": 2,
            "circle-stroke-color": color,
            "circle-stroke-opacity": 0.5,
          },
          layout: { visibility: "visible" },
        })
        break
      case "LineString":
        mapInstance.addLayer(
          {
            id: layerId,
            type: "line",
            source: layerId,
            paint: {
              "line-color": color,
              "line-width": 3,
              "line-gap-width": 5,
            },
            layout: { visibility: "visible" },
          },
          TRAIN_STATION_LAYER
        )
        break
      case "Polygon":
        mapInstance.addLayer(
          {
            id: layerId,
            type: "fill",
            source: layerId,
            paint: {
              "fill-color": color,
              "fill-opacity": 0.4,
              "fill-outline-color": color,
            },
            layout: { visibility: "visible" },
          },
          TRAIN_LINE_LAYER
        )
        break
    }
    addHoverPopup(layerId)
  }

  const fitMapToGeoJson = (geoJsonData: FeatureCollection<Geometry>) => {
    try {
      const [minX, minY, maxX, maxY] = bbox(geoJsonData)
      const { getMapInstance } = useMapInstance() as IMapInstance
      const mapInstance = getMapInstance()
      mapInstance.fitBounds(
        [
          [minX, minY],
          [maxX, maxY],
        ],
        { padding: 50, duration: 1000 }
      )
    } catch (e) {
      console.warn("bbox calculation failed", e)
    }
  }

  const addGeoJsonLayer = (geoJsonData: FeatureCollection<Geometry>) => {
    if (!geoJsonData?.features?.length) return

    const sharedColor = generateRandomColor()

    // ジオメトリごとにまとめる
    const points: Feature<Geometry>[] = []
    const lines: Feature<Geometry>[] = []
    const polygons: Feature<Geometry>[] = []

    geoJsonData.features.forEach((feature) => {
      const geomType = feature.geometry?.type
      if (!geomType) return
      if (geomType === "Point" || geomType === "MultiPoint") points.push(feature)
      else if (geomType === "LineString" || geomType === "MultiLineString") lines.push(feature)
      else if (geomType === "Polygon" || geomType === "MultiPolygon") polygons.push(feature)
    })

    if (points.length)
      addLayer(
        generateLayerId(),
        { type: "FeatureCollection", features: points },
        "Point",
        sharedColor
      )
    if (lines.length)
      addLayer(
        generateLayerId(),
        { type: "FeatureCollection", features: lines },
        "LineString",
        sharedColor
      )
    if (polygons.length)
      addLayer(
        generateLayerId(),
        { type: "FeatureCollection", features: polygons },
        "Polygon",
        sharedColor
      )

    // bbox でズーム
    fitMapToGeoJson(geoJsonData)
  }

  const toggleLayer = (layerId: string) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return

    const layer = map.getLayer(layerId)
    if (!layer) return

    const currentVisibility = map.getLayoutProperty(layerId, "visibility")
    const newVisibility = currentVisibility === "visible" ? "none" : "visible"
    map.setLayoutProperty(layerId, "visibility", newVisibility)
  }

  const backToLayer = (layerId: string) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return

    const layers = map.getStyle().layers
    if (!layers) return

    const index = layers.findIndex((l) => l.id === layerId)
    if (index <= 0) return // これ以上下に行けない

    const prevLayerId = layers[index - 1].id
    map.moveLayer(layerId, prevLayerId)
  }

  /**
   * １つ前面（上）に移動
   * @param layerId
   */
  const frontToLayer = (layerId: string) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return

    const layers = map.getStyle().layers
    if (!layers) return

    const index = layers.findIndex((l) => l.id === layerId)
    if (index < 0 || index >= layers.length - 1) return // これ以上上に行けない

    // さらに1つ上があるならそこへ移動、なければ最前面へ
    const beforeId = layers[index + 2]?.id ?? undefined

    // 「beforeId の直前」に移動するので、結果1つ上へ行く
    map.moveLayer(layerId, beforeId)
  }

  /**
   * 透明度を指定
   * @param layerId
   * @param opacity
   */
  const setLayerOpacity = (layerId: string, opacity: number) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return

    const layer = map.getLayer(layerId)
    if (!layer) return

    const type = layer.type
    switch (type) {
      case "circle":
        map.setPaintProperty(layerId, "circle-opacity", opacity)
        map.setPaintProperty(layerId, "circle-stroke-opacity", opacity)
        break
      case "line":
        map.setPaintProperty(layerId, "line-opacity", opacity)
        break
      case "fill":
        map.setPaintProperty(layerId, "fill-opacity", opacity)
        break
    }
  }

  /**
   * 色を指定
   * @param layerId
   * @param color
   */
  const setLayerColor = (layerId: string, color: string) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return

    const layer = map.getLayer(layerId)
    if (!layer) return

    const type = layer.type
    switch (type) {
      case "circle":
        map.setPaintProperty(layerId, "circle-color", color)
        map.setPaintProperty(layerId, "circle-stroke-color", color)
        break
      case "line":
        map.setPaintProperty(layerId, "line-color", color)
        break
      case "fill":
        map.setPaintProperty(layerId, "fill-color", color)
        map.setPaintProperty(layerId, "fill-outline-color", color)
        break
    }
  }

  return { addGeoJsonLayer, toggleLayer, backToLayer, frontToLayer, setLayerOpacity, setLayerColor }
}

export default useMapLayer
