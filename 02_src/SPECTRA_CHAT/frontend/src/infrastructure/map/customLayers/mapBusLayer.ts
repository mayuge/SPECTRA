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

  const map = getMapInstance()

  /** 表示意図（UI状態） */
  const busLayerVisibility = ref<boolean>(true)

  /** Deck.gl overlay 実体 */
  let overlay: MapboxOverlay | null = null

  /** Popup */
  let popup: maplibregl.Popup | null = null

  /** zoom / toggle で呼ばれる更新関数 */
  let updateOverlay: (() => void) | null = null

  const toggleBusLayer = (): void => {
    toggleLayer(TOEI_BUS_POINT_LAYER)
    busLayerVisibility.value = !busLayerVisibility.value
    updateOverlay?.()
  }

  const getBusLayerVisibility = (): boolean => {
    return busLayerVisibility.value
  }

  const geojsonToArcData = (geojson: FeatureCollection) => {
    return geojson.features.map((f) => {
      // @ts-ignore
      const coords = f.geometry.coordinates
      return {
        source: coords[0],
        target: coords[1],
        ...f.properties,
      }
    })
  }

  /**
   * 都営バス路線（ArcLayer）
   */
  const addToeiBusLineLayer = (geojson: FeatureCollection): void => {
    const arcData = geojsonToArcData(geojson)

    updateOverlay = () => {
      const zoom = map.getZoom()
      const shouldShow = busLayerVisibility.value && zoom >= 14

      // ▶ 表示すべき & まだ無い → add
      if (shouldShow && !overlay) {
        overlay = new MapboxOverlay({
          interleaved: true,
          layers: [
            new ArcLayer({
              id: TOEI_BUS_LINE_LAYER,
              data: arcData,
              parameters: { depthTest: false },
              getSourcePosition: (d) => d.source,
              getTargetPosition: (d) => d.target,
              getWidth: (d) => d.frequency / 200 + 1,
              getSourceColor: () => [178, 210, 53, 150],
              getTargetColor: () => [178, 210, 53, 150],
              getHeight: () => 0.5,
              pickable: true,
              autoHighlight: true,
              onHover: (info) => {
                popup?.remove()
                popup = null

                if (info.object) {
                  const html = generateHoverHtml(info.object)
                  popup = new maplibregl.Popup({
                    closeButton: true,
                    closeOnClick: true,
                    maxWidth: "1000px",
                  })
                  // @ts-ignore
                  popup.setLngLat(info.coordinate).setHTML(html).addTo(map)
                }
              },
            }),
          ],
        })

        map.addControl(overlay)
        return
      }

      // ▶ 非表示にすべき & 今ある → remove
      if (!shouldShow && overlay) {
        map.removeControl(overlay)
        overlay = null
      }
    }

    // ※ zoom 中に消えないようにしたいなら "zoomend" 推奨
    map.on("zoom", updateOverlay)
    updateOverlay()
  }

  /**
   * 都営バス停（SymbolLayer）
   */
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
