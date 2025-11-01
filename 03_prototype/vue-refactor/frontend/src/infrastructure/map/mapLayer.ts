import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { FeatureCollection, Feature } from "geojson"

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

  const addPointLayer = (map: any, layerId: string, feature: Feature, sharedColor: string) => {
    const color = getLayerColor(layerId, sharedColor)
    if (map.getSource(layerId)) {
      ;(map.getSource(layerId) as any).setData(feature)
    } else {
      map.addSource(layerId, { type: "geojson", data: feature })
      map.addLayer({
        id: layerId,
        type: "circle",
        source: layerId,
        paint: {
          "circle-radius": 6,
          "circle-color": color,
          "circle-stroke-opacity": 0.4,
          "circle-stroke-color": color,
          "circle-stroke-width": 4,
        },
      })
    }
  }

  const addLineLayer = (map: any, layerId: string, feature: Feature, sharedColor: string) => {
    const color = getLayerColor(layerId, sharedColor)
    if (map.getSource(layerId)) {
      ;(map.getSource(layerId) as any).setData(feature)
    } else {
      map.addSource(layerId, { type: "geojson", data: feature })
      map.addLayer({
        id: layerId,
        type: "line",
        source: layerId,
        paint: { "line-width": 4, "line-color": color },
      })
    }
  }

  const addPolygonLayer = (map: any, layerId: string, feature: Feature, sharedColor: string) => {
    const color = getLayerColor(layerId, sharedColor)
    if (map.getSource(layerId)) {
      ;(map.getSource(layerId) as any).setData(feature)
    } else {
      map.addSource(layerId, { type: "geojson", data: feature })
      map.addLayer({
        id: layerId,
        type: "fill",
        source: layerId,
        paint: { "fill-color": color, "fill-opacity": 0.4 },
      })
    }
  }

  /**
   * FeatureCollectionを追加
   * → 呼び出し単位で sharedColor を固定
   */
  const addGeoJsonLayer = (mapInstance: any, geoJsonData: FeatureCollection) => {
    if (!geoJsonData?.features?.length) return

    const sharedColor = generateRandomColor() // 同タイミングの色を固定

    geoJsonData.features.forEach((feature) => {
      const layerId = generateLayerId()
      const type = feature.geometry?.type
      if (!type) return

      switch (type) {
        case "Point":
        case "MultiPoint":
          addPointLayer(mapInstance, layerId, feature, sharedColor)
          break
        case "LineString":
        case "MultiLineString":
          addLineLayer(mapInstance, layerId, feature, sharedColor)
          break
        case "Polygon":
        case "MultiPolygon":
          addPolygonLayer(mapInstance, layerId, feature, sharedColor)
          break
      }
      const bounds = getBoundingBox(geoJsonData)
      if (bounds && bounds.length === 2) {
        mapInstance.fitBounds(bounds, { padding: 50, duration: 1000 })
      }
    })
  }

  const getBoundingBox = (geoJsonData: FeatureCollection) => {
    const coordinates = geoJsonData.features.flatMap((feature) => {
      const geom = feature.geometry
      if (!geom) return []
      switch (geom.type) {
        case "Point":
          return [geom.coordinates as number[]]
        case "MultiPoint":
          return geom.coordinates as number[][]
        case "LineString":
          return geom.coordinates as number[][]
        case "MultiLineString":
          return (geom.coordinates as number[][][]).flat()
        case "Polygon":
          return (geom.coordinates as number[][][]).flat()

        case "MultiPolygon":
          return (geom.coordinates as number[][][][]).flat(2)
        default:
          return []
      }
    })

    const lats = coordinates.map((coord) => coord[1])
    const lngs = coordinates.map((coord) => coord[0])
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)
    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ]
  }

  const toggleLayer = (mapInstance: any, layerId: string) => {
    const visibility = mapInstance.getLayoutProperty(layerId, "visibility")
    mapInstance.setLayoutProperty(
      layerId,
      "visibility",
      visibility === "visible" ? "none" : "visible"
    )
  }

  return { addGeoJsonLayer, toggleLayer }
}

export default useMapLayer
