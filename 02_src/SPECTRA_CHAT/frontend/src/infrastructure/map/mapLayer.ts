import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { FeatureCollection, Feature, Geometry } from "geojson"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPopup } from "@/domain/interfaces/IMapPopup"

import maplibregl from "maplibre-gl"
import useMapInstance from "@/infrastructure/map/mapInstance"

import { bbox } from "@turf/turf"
import useMapPopup from "./mapPopup"

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
    const mapInstance = getMapInstance()
    const color = getLayerColor(layerId, sharedColor)

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
        mapInstance.addLayer({
          id: layerId,
          type: "line",
          source: layerId,
          paint: {
            "line-color": color,
            "line-width": 3,
            "line-gap-width": 5,
          },
          layout: { visibility: "visible" },
        })
        break
      case "Polygon":
        mapInstance.addLayer({
          id: layerId,
          type: "fill",
          source: layerId,
          paint: {
            "fill-color": color,
            "fill-opacity": 0.4,
            "fill-outline-color": color,
          },
          layout: { visibility: "visible" },
        })
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

  return { addGeoJsonLayer, toggleLayer }
}

export default useMapLayer
