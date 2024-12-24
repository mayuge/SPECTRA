"use client"

import React, { useRef, useEffect } from "react"
import maplibregl, { LayerSpecification } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const MapApp: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<maplibregl.Map | null>(null)
  const { getLayers } = useViewSiteMain()

  const displayMap = () => {
    const layers = getLayers()
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {}, // sourcesは必ず空にしておいて、後からオブジェクトから参照して追加する
          layers: [],
        },
        center: [139.7024, 35.6598], // center は [number, number] 型で指定
        zoom: 16,
        pitch: 60,
        bearing: 40,
      })

      // 地図が読み込まれた後にソースとレイヤーを追加
      mapInstance.current.on("load", () => {
        
        layers.forEach((layer) => {
          // ソースを追加
          mapInstance.current?.addSource(layer.sourceId, layer.source)

          // レイヤーを追加
          mapInstance.current?.addLayer({
            id: layer.id,
            type: layer.type,
            source: layer.sourceId,
            paint: layer.paint,
            layout: layer.layout || {}, // layoutが存在しない場合は空のオブジェクトを使用
          } as LayerSpecification)
        })

        mapInstance.current?.addControl(new maplibregl.NavigationControl(), "bottom-right")
      })
    }
  }

  useEffect(() => {
    displayMap()
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <div ref={mapContainer} className="w-full h-full"></div>
    </div>
  )
}

export default MapApp