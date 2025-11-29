import type { IMapBusLayer } from "@/domain/interfaces/IMapBusLayer"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPopup } from "@/domain/interfaces/IMapPopup"
import type { FeatureCollection } from "geojson"

import useMapInstance from "@/infrastructure/map/mapInstance"
import useMapPopup from "@/infrastructure/map/mapPopup"

import maplibregl from "maplibre-gl"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { ArcLayer } from "deck.gl"

import { ref } from "vue"

import { TOEI_BUS_LINE_LAYER } from "@/domain/params/customLayerName"

const useMapBusLayer = (): IMapBusLayer => {
  const { getMapInstance } = useMapInstance() as IMapInstance
  const { generateHoverHtml } = useMapPopup() as IMapPopup

  let overlay: MapboxOverlay | null = null
  let popup: maplibregl.Popup | null = null
  const busLayerVisiblity = ref<boolean>(true)

  const toggleBusLayer = (): void => {
    busLayerVisiblity.value = !busLayerVisiblity.value
    if (updateOverlay) updateOverlay() // ← 即時反映
  }

  const getBusLayerVisibility = (): boolean => {
    return busLayerVisiblity.value
  }

  let updateOverlay: (() => void) | null = null
  const geojsonToArcData = (geojson) => {
    return geojson.features.map((f) => {
      const coords = f.geometry.coordinates

      return {
        source: coords[0], // 始点
        target: coords[1], // 終点
        ...f.properties, // frequency など全部保持
      }
    })
  }
  const addToeiBusLineLayer = (geojson: FeatureCollection): void => {
    const map = getMapInstance()
    const arcData = geojsonToArcData(geojson)

    updateOverlay = () => {
      const zoom = map.getZoom()
      if (busLayerVisiblity.value && zoom >= 13 && !overlay) {
        overlay = new MapboxOverlay({
          interleaved: true,
          layers: [
            new ArcLayer({
              id: TOEI_BUS_LINE_LAYER,
              data: arcData,
              getSourcePosition: (d) => d.source,
              getTargetPosition: (d) => d.target,
              getWidth: (d) => d.frequency / 200,
              getSourceColor: () => [178, 210, 53, 150],
              getTargetColor: () => [178, 210, 53, 150],
              getHeight: () => 0.5,
              pickable: true,
              autoHighlight: true,
              onHover: (info) => {
                if (popup) {
                  popup.remove()
                  popup = null
                }
                if (info.object) {
                  const hoverHtml = generateHoverHtml(info.object)
                  popup = new maplibregl.Popup({
                    closeButton: false,
                    closeOnClick: false,
                    maxWidth: "1000px",
                  })
                  //@ts-ignore
                  popup.setLngLat(info.coordinate).setHTML(hoverHtml).addTo(map)
                }
              },
            }),
          ],
        })
        map.addControl(overlay)
      } else if ((!busLayerVisiblity.value || zoom < 13) && overlay) {
        map.removeControl(overlay)
        overlay = null
      }
    }

    map.on("zoom", updateOverlay)
    updateOverlay() // 初期表示チェック
  }
  return {
    addToeiBusLineLayer,
    toggleBusLayer,
    getBusLayerVisibility,
  }
}
export default useMapBusLayer
