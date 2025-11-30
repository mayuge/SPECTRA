import type { IMapBusLayer } from "@/domain/interfaces/IMapBusLayer"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IMapPopup } from "@/domain/interfaces/IMapPopup"
import type { FeatureCollection } from "geojson"

import useMapInstance from "@/infrastructure/map/mapInstance"
import useMapLayer from "@/infrastructure/map/mapLayer"
import useMapPopup from "@/infrastructure/map/mapPopup"

import maplibregl, { SymbolLayerSpecification } from "maplibre-gl"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { ArcLayer } from "deck.gl"

import { ref } from "vue"

import { TOEI_BUS_LINE_LAYER, TOEI_BUS_POINT_LAYER } from "@/domain/params/customLayerName"

const useMapBusLayer = (): IMapBusLayer => {
  const { getMapInstance } = useMapInstance() as IMapInstance
  const { toggleLayer } = useMapLayer() as IMapLayer
  const { generateHoverHtml, addHoverPopup } = useMapPopup() as IMapPopup

  let overlay: MapboxOverlay | null = null
  let popup: maplibregl.Popup | null = null

  const map = getMapInstance()
  const busLayerVisiblity = ref<boolean>(true)

  const toggleBusLayer = (): void => {
    toggleLayer(TOEI_BUS_POINT_LAYER)
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
    const arcData = geojsonToArcData(geojson)

    updateOverlay = () => {
      const zoom = map.getZoom()
      if (busLayerVisiblity.value && zoom >= 14 && !overlay) {
        overlay = new MapboxOverlay({
          interleaved: true,
          layers: [
            new ArcLayer({
              id: TOEI_BUS_LINE_LAYER,
              data: arcData,
              parameters: {
                depthTest: false, // 奥に沈まないように
              },
              getSourcePosition: (d) => d.source,
              getTargetPosition: (d) => d.target,
              getWidth: (d) => d.frequency / 200 + 1,
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
      } else {
        map.removeControl(overlay)
        overlay = null
      }
    }

    map.on("zoom", updateOverlay)
    updateOverlay() // 初期表示チェック
  }

  const addToeiBusPointLayer = (geojson: FeatureCollection): void => {
    map.addSource(TOEI_BUS_POINT_LAYER, {
      type: "geojson",
      data: geojson,
    })
    const symbolLayer: SymbolLayerSpecification = {
      id: TOEI_BUS_POINT_LAYER,
      type: "symbol",
      source: TOEI_BUS_POINT_LAYER,
      minzoom: 14,
      layout: {
        visibility: "visible",
        "text-field": ["get", "similar_stop_name"],
        "text-font": ["Noto Sans CJK JP Bold"],
        "text-size": 9,
        "text-anchor": "top",
        "text-offset": [0, 0],
        "text-allow-overlap": false,
      },
      paint: {
        "text-color": "#ffffff",
        "text-halo-color": "#222222",
        "text-halo-width": 0.5,
      },
    }

    map.addLayer(symbolLayer)
    addHoverPopup(TOEI_BUS_POINT_LAYER)
  }

  return {
    addToeiBusLineLayer,
    addToeiBusPointLayer,
    toggleBusLayer,
    getBusLayerVisibility,
  }
}
export default useMapBusLayer
