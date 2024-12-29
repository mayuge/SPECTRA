"use client"

import React, { useRef, useEffect } from "react"
import maplibregl, { LayerSpecification, SourceSpecification } from "maplibre-gl"
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
          version: 8 as const,
          sources: {},
          layers: [],
          sky: {
            "sky-color": "#199EF3",
            "sky-horizon-blend": 0.5,
            "horizon-color": "#ffffff",
            "horizon-fog-blend": 0.5,
            "fog-color": "#0000ff",
            "fog-ground-blend": 0.5,
            "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 1, 10, 1, 12, 0],
          },
        },
        zoom: 12,
        maxPitch: 85,
        center: [139.7024, 35.6598],
        pitch: 60,
        bearing: 20,
      })
    }

    // レイヤーの更新処理
    const updateLayers = () => {
      const layers = getLayers()
      const map = mapInstance.current

      if (map?.isStyleLoaded()) {
        layers.forEach((layer) => {
          if (!map.getSource(layer.sourceId)) {
            map.addSource(layer.sourceId, layer.source as SourceSpecification)
          }
          if (!map.getLayer(layer.id)) {
            if (layer["source-layer"] === undefined) {
              map.addLayer({
                id: layer.id,
                type: layer.type,
                source: layer.sourceId,
                paint: layer.paint,
                layout: layer.layout,
              } as LayerSpecification)
            } else {
              map.addLayer({
                id: layer.id,
                type: layer.type,
                source: layer.sourceId,
                "source-layer": layer["source-layer"],
                paint: layer.paint,
                layout: layer.layout,
              } as LayerSpecification)
            }
          } else {
            map.moveLayer(layer.id)
            // レイヤーのvisibilityを更新
            if (layer.layout && layer.layout.visibility) {
              map.setLayoutProperty(layer.id, "visibility", layer.layout.visibility)
            }

            // opacityの更新処理
            if (layer.paint) {
              // Fill Layer
              if (layer.type === "fill" && "fill-opacity" in layer.paint) {
                const paint = layer.paint
                if (paint["fill-opacity"] !== undefined) {
                  map.setPaintProperty(layer.id, "fill-opacity", paint["fill-opacity"])
                }
              }
              // Line Layer
              else if (layer.type === "line" && "line-opacity" in layer.paint) {
                const paint = layer.paint
                if (paint["line-opacity"] !== undefined) {
                  map.setPaintProperty(layer.id, "line-opacity", paint["line-opacity"])
                }
              }
              // Raster Layer
              else if (layer.type === "raster" && "raster-opacity" in layer.paint) {
                const paint = layer.paint
                if (paint["raster-opacity"] !== undefined) {
                  map.setPaintProperty(layer.id, "raster-opacity", paint["raster-opacity"])
                }
              }
              // Circle Layer
              else if (layer.type === "circle" && "circle-opacity" in layer.paint) {
                const paint = layer.paint
                if (paint["circle-opacity"] !== undefined) {
                  map.setPaintProperty(layer.id, "circle-opacity", paint["circle-opacity"])
                }
              }
              // Fill-Extrusion Layer
              else if (layer.type === "fill-extrusion" && "fill-extrusion-opacity" in layer.paint) {
                const paint = layer.paint
                if (paint["fill-extrusion-opacity"] !== undefined) {
                  map.setPaintProperty(layer.id, "fill-extrusion-opacity", paint["fill-extrusion-opacity"])
                }
              }
            }
          }
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
    console.log(getLayers())
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
