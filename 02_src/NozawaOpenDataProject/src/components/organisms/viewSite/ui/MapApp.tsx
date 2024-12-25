"use client"

import React, { useRef, useEffect } from "react"
import maplibregl, { LayerSpecification } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"


const MapApp: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<maplibregl.Map | null>(null)
  const { getLayers } = useViewSiteMain()

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {},
          layers: [],
        },
        center: [139.7024, 35.6598],
        zoom: 16,
        pitch: 60,
        bearing: 40,
      })
    }

    // レイヤーの更新処理
    const updateLayers = () => {
      const layers = getLayers()
      const map = mapInstance.current

      if (map?.isStyleLoaded()) {
        // 既存のレイヤーをクリア
        const currentStyle = map.getStyle()
        currentStyle.layers.forEach(layer => {
          map.removeLayer(layer.id)
        })

        // 新しいレイヤーを追加
        layers.forEach(layer => {
          if (!map.getSource(layer.sourceId)) {
            map.addSource(layer.sourceId, layer.source)
          }
          map.addLayer({
            id: layer.id,
            type: layer.type,
            source: layer.sourceId,
            paint: layer.paint,
            layout: layer.layout || {},
          } as LayerSpecification)
        })
      }
    }

    // 初期読み込み時のコントロール追加
    mapInstance.current?.on("load", () => {
      mapInstance.current?.addControl(new maplibregl.NavigationControl(), "bottom-right")
      updateLayers()
    })

    // レイヤーの変更を監視
    const timer = setInterval(updateLayers, 100)

    return () => {
      clearInterval(timer)
    }
  }, [getLayers])

  return (
    <div className="absolute inset-0 z-0">
      <div ref={mapContainer} className="w-full h-full"></div>
    </div>
  )
}
export default MapApp