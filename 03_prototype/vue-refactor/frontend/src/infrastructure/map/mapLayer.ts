import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
const useMapLayer = (): IMapLayer => {
  /**
   * GeoJSONレイヤ追加
   * @param mapInstance
   * @param layerId
   * @param geoJsonData
   */
  const addGeoJsonLayer = (mapInstance: any, geoJsonData: any) => {
    //geojson-layer-0からの数字でidを設定する。すでに存在している場合は繰り上がる

    let layerIndex = 0
    let layerId = `geojson-layer-${layerIndex}`
    while (mapInstance.getLayer(layerId)) {
      layerIndex++
      layerId = `geojson-layer-${layerIndex}`
    }
    mapInstance.addSource(layerId, {
      type: "geojson",
      data: geoJsonData,
    })
    //point, line, polygonに応じてレイヤタイプを変更
    const geometryType = geoJsonData.features[0]?.geometry?.type

    //Point、MultiPointの場合
    if (geometryType === "Point" || geometryType === "MultiPoint") {
      mapInstance.addLayer({
        id: layerId,
        type: "circle",
        source: layerId,
        paint: {
          "circle-radius": 6,
          "circle-color": "#007cbf",
        },
      })
    }
    //LineString、MultiLineStringの場合
    else if (geometryType === "LineString" || geometryType === "MultiLineString") {
      mapInstance.addLayer({
        id: layerId,
        type: "line",
        source: layerId,
        paint: {
          "line-width": 4,
          "line-color": "#007cbf",
        },
      })
    }
    //Polygon、MultiPolygonの場合
    else {
      mapInstance.addLayer({
        id: layerId,
        type: "fill",
        source: layerId,
        paint: {
          "fill-color": "#007cbf",
          "fill-opacity": 0.5,
        },
      })
    }
  }

  /**
   * レイヤ表示切替
   * @param mapInstance
   * @param layerId
   */
  const toggleLayer = (mapInstance: any, layerId: string) => {
    const visibility = mapInstance.getLayoutProperty(layerId, "visibility")
    if (visibility === "visible") {
      mapInstance.setLayoutProperty(layerId, "visibility", "none")
    } else {
      mapInstance.setLayoutProperty(layerId, "visibility", "visible")
    }
  }

  return { addGeoJsonLayer, toggleLayer }
}
export default useMapLayer
