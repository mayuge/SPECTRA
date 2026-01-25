import * as turf from "@turf/turf"
import type {
  Feature,
  FeatureCollection,
  Geometry,
  Point,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon,
} from "geojson"
import type { IGeoProcessing } from "@/domain/interfaces/IGeoprocessing"

const useGeoProcessing = (): IGeoProcessing => {
  /* ---------------------------------
   * geometry guards
   * --------------------------------- */
  const isPoint = (g?: Geometry): g is Point => g?.type === "Point"

  const isLineString = (g?: Geometry): g is LineString => g?.type === "LineString"

  const isMultiLineString = (g?: Geometry): g is MultiLineString => g?.type === "MultiLineString"

  const isPolygon = (g?: Geometry): g is Polygon | MultiPolygon =>
    g?.type === "Polygon" || g?.type === "MultiPolygon"

  /* ---------------------------------
   * entry
   * --------------------------------- */
  const intersectFeature = (main: Feature, sub: Feature): Feature | null => {
    // Point × Polygon
    if (isPoint(main.geometry) && isPolygon(sub.geometry)) {
      return pointInPolygon(main as Feature<Point>, sub as Feature<Polygon | MultiPolygon>)
    }

    // Point × LineString
    if (isPoint(main.geometry) && isLineString(sub.geometry)) {
      return pointOnLine(main as Feature<Point>, sub as Feature<LineString>)
    }

    // Point × MultiLineString
    if (isPoint(main.geometry) && isMultiLineString(sub.geometry)) {
      return pointOnMultiLine(main as Feature<Point>, sub as Feature<MultiLineString>)
    }

    // Line × Polygon
    if (
      (isLineString(main.geometry) || isMultiLineString(main.geometry)) &&
      isPolygon(sub.geometry)
    ) {
      return lineIntersectsPolygon(
        main as Feature<LineString | MultiLineString>,
        sub as Feature<Polygon | MultiPolygon>
      )
    }

    // Line × Line
    if (
      (isLineString(main.geometry) || isMultiLineString(main.geometry)) &&
      (isLineString(sub.geometry) || isMultiLineString(sub.geometry))
    ) {
      return lineIntersectsLine(
        main as Feature<LineString | MultiLineString>,
        sub as Feature<LineString | MultiLineString>
      )
    }

    // Polygon × Line
    if (
      isPolygon(main.geometry) &&
      (isLineString(sub.geometry) || isMultiLineString(sub.geometry))
    ) {
      return polygonIntersectsLine(
        main as Feature<Polygon | MultiPolygon>,
        sub as Feature<LineString | MultiLineString>
      )
    }

    // Polygon × Polygon
    if (isPolygon(main.geometry) && isPolygon(sub.geometry)) {
      return polygonIntersection(
        main as Feature<Polygon | MultiPolygon>,
        sub as Feature<Polygon | MultiPolygon>
      )
    }

    return null
  }

  /* ---------------------------------
   * processors
   * --------------------------------- */

  const pointInPolygon = (
    point: Feature<Point>,
    polygon: Feature<Polygon | MultiPolygon>
  ): Feature<Point> | null => {
    if (!turf.booleanPointInPolygon(point, polygon)) return null

    return {
      type: "Feature",
      geometry: point.geometry,
      properties: { ...point.properties, ...polygon.properties },
    }
  }

  const pointOnLine = (point: Feature<Point>, line: Feature<LineString>): Feature<Point> | null => {
    if (!turf.booleanPointOnLine(point, line)) return null

    return {
      type: "Feature",
      geometry: point.geometry,
      properties: { ...point.properties, ...line.properties },
    }
  }

  const pointOnMultiLine = (
    point: Feature<Point>,
    multi: Feature<MultiLineString>
  ): Feature<Point> | null => {
    for (const coords of multi.geometry.coordinates) {
      const line: Feature<LineString> = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
        properties: {},
      }

      if (turf.booleanPointOnLine(point, line)) {
        return {
          type: "Feature",
          geometry: point.geometry,
          properties: { ...point.properties, ...multi.properties },
        }
      }
    }
    return null
  }

  const lineIntersectsPolygon = (
    line: Feature<LineString | MultiLineString>,
    polygon: Feature<Polygon | MultiPolygon>
  ): Feature | null => {
    if (!turf.booleanIntersects(line, polygon)) return null

    return {
      type: "Feature",
      geometry: line.geometry,
      properties: { ...line.properties, ...polygon.properties },
    }
  }

  const lineIntersectsLine = (
    main: Feature<LineString | MultiLineString>,
    sub: Feature<LineString | MultiLineString>
  ): Feature | null => {
    if (!turf.booleanIntersects(main, sub)) return null

    return {
      type: "Feature",
      geometry: main.geometry,
      properties: { ...main.properties, ...sub.properties },
    }
  }

  const polygonIntersectsLine = (
    polygon: Feature<Polygon | MultiPolygon>,
    line: Feature<LineString | MultiLineString>
  ): Feature | null => {
    if (!turf.booleanIntersects(polygon, line)) return null

    return {
      type: "Feature",
      geometry: polygon.geometry,
      properties: { ...polygon.properties, ...line.properties },
    }
  }

  const polygonIntersection = (
    main: Feature<Polygon | MultiPolygon>,
    sub: Feature<Polygon | MultiPolygon>
  ): Feature | null => {
    try {
      // turf.intersect は FeatureCollection を期待するため、featureCollection でラップする
      const intersection = turf.intersect(turf.featureCollection([main, sub]))
      if (!intersection) return null

      return {
        type: "Feature",
        geometry: intersection.geometry,
        properties: { ...main.properties, ...sub.properties },
      }
    } catch {
      return null
    }
  }

  /* ---------------------------------
   * FeatureCollection
   * --------------------------------- */
  const intersectGeojson = (main: FeatureCollection, sub: FeatureCollection): FeatureCollection => {
    const features: Feature[] = []

    main.features.forEach((m) => {
      sub.features.forEach((s) => {
        const result = intersectFeature(m, s)
        if (result) features.push(result)
      })
    })

    return { type: "FeatureCollection", features }
  }

  return {
    intersectGeojson,
    intersectFeature,
  }
}

export default useGeoProcessing
