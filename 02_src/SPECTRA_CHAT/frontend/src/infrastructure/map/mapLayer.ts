import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { FeatureCollection, Feature, Geometry } from "geojson"
import bbox from "@turf/bbox"

type MapInstance = any // maplibre-gl.Map など、具体的型に置き換えてOK

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

  const addLayer = (
    map: MapInstance,
    layerId: string,
    featureCollection: FeatureCollection<Geometry>,
    type: "Point" | "LineString" | "Polygon",
    sharedColor: string
  ) => {
    const color = getLayerColor(layerId, sharedColor)

    if (map.getSource(layerId)) {
      ;(map.getSource(layerId) as any).setData(featureCollection)
      return
    }

    map.addSource(layerId, { type: "geojson", data: featureCollection })

    switch (type) {
      case "Point":
        map.addLayer({
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
        })
        break
      case "LineString":
        map.addLayer({
          id: layerId,
          type: "line",
          source: layerId,
          paint: {
            "line-color": color,
            "line-width": 3,
            "line-gap-width": 5,
          },
        })
        break
      case "Polygon":
        map.addLayer({
          id: layerId,
          type: "fill",
          source: layerId,
          paint: {
            "fill-color": color,
            "fill-opacity": 0.4,
            "fill-outline-color": color,
          },
        })
        break
    }
  }

  const fitMapToGeoJson = (map: MapInstance, geoJsonData: FeatureCollection<Geometry>) => {
    try {
      const [minX, minY, maxX, maxY] = bbox(geoJsonData)
      map.fitBounds(
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

  const addGeoJsonLayer = (map: MapInstance, geoJsonData: FeatureCollection<Geometry>) => {
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
        map,
        generateLayerId(),
        { type: "FeatureCollection", features: points },
        "Point",
        sharedColor
      )
    if (lines.length)
      addLayer(
        map,
        generateLayerId(),
        { type: "FeatureCollection", features: lines },
        "LineString",
        sharedColor
      )
    if (polygons.length)
      addLayer(
        map,
        generateLayerId(),
        { type: "FeatureCollection", features: polygons },
        "Polygon",
        sharedColor
      )

    // bbox でズーム
    fitMapToGeoJson(map, geoJsonData)
  }

  const toggleLayer = (map: MapInstance, layerId: string) => {
    const visibility = map.getLayoutProperty(layerId, "visibility")
    map.setLayoutProperty(layerId, "visibility", visibility === "visible" ? "none" : "visible")
  }

  return { addGeoJsonLayer, toggleLayer }
}

export default useMapLayer
