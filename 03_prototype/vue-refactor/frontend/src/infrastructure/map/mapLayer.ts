import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
const useMapLayer = (): IMapLayer => {
  /**
   * GeoJSONレイヤ追加
   * @param mapInstance
   * @param layerId
   * @param geoJsonData
   */
  const addGeoJsonLayer = (mapInstance: any, layerId: string, geoJsonData: any) => {
    mapInstance.addSource(layerId, {
      type: "geojson",
      data: geoJsonData,
    })
    mapInstance.addLayer({
      id: layerId,
      type: "fill",
      source: layerId,
      layout: {},
      paint: {
        "fill-color": "#088",
        "fill-opacity": 0.8,
      },
    })
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
