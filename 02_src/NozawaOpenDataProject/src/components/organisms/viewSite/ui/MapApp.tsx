"use client"

import React, { useRef, useEffect } from "react"
import maplibregl, { LayerSpecification, SourceSpecification } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

/**
 * レイヤをマップに追加
 */
const addLayerToMap = (map: maplibregl.Map, layer: any) => {
  if (layer["source-layer"] === undefined) {
    map.addLayer({
      id: layer.id,
      type: layer.type,
      source: layer.sourceId,
      paint: layer.paint || {}, // paintプロパティが存在しない場合は空のオブジェクトを設定
      layout: layer.layout,
      maxzoom: layer.maxzoom !== undefined ? layer.maxzoom : 22, // maxzoomが存在しない場合のデフォルト値
      minzoom: layer.minzoom !== undefined ? layer.minzoom : 0, // minzoomが存在しない場合のデフォルト値
    } as LayerSpecification)
  } else {
    map.addLayer({
      id: layer.id,
      type: layer.type,
      source: layer.sourceId,
      "source-layer": layer["source-layer"],
      paint: layer.paint || {}, // paintプロパティが存在しない場合は空のオブジェクトを設定
      layout: layer.layout,
      maxzoom: layer.maxzoom !== undefined ? layer.maxzoom : 22, // maxzoomが存在しない場合のデフォルト値
      minzoom: layer.minzoom !== undefined ? layer.minzoom : 0, // minzoomが存在しない場合のデフォルト値
    } as LayerSpecification)
  }

  // ポップアップの設定
  if (layer.popup) {
    map.on("click", layer.id, (e) => {
      const feature = e.features ? e.features[0] : null
      if (!feature) return

      const properties = feature.properties
      const popupContent = layer.popup.template(properties) // template関数を使用してHTMLコンテンツ生成

      const popup = new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setDOMContent(popupContent) // HTML要素を設定
        .addTo(map)
    })
  }
}

/**
 * 既存のレイヤに変更があった場合
 */
const updateExistingLayer = (map: maplibregl.Map, layer: any) => {
  map.moveLayer(layer.id)

  if (layer.layout?.visibility) {
    map.setLayoutProperty(layer.id, "visibility", layer.layout.visibility)
  }

  if (layer.paint) {
    const paint = layer.paint
    if (layer.type === "fill" && "fill-opacity" in paint) {
      map.setPaintProperty(layer.id, "fill-opacity", paint["fill-opacity"])
    } else if (layer.type === "line" && "line-opacity" in paint) {
      map.setPaintProperty(layer.id, "line-opacity", paint["line-opacity"])
    } else if (layer.type === "raster" && "raster-opacity" in paint) {
      map.setPaintProperty(layer.id, "raster-opacity", paint["raster-opacity"])
    } else if (layer.type === "circle" && "circle-opacity" in paint) {
      map.setPaintProperty(layer.id, "circle-opacity", paint["circle-opacity"])
      map.setPaintProperty(layer.id, "circle-stroke-opacity", paint["circle-opacity"])
    } else if (layer.type === "fill-extrusion" && "fill-extrusion-opacity" in paint) {
      map.setPaintProperty(layer.id, "fill-extrusion-opacity", paint["fill-extrusion-opacity"])
    }
  }
}

const initializeMap = async (
  mapContainer: React.RefObject<HTMLDivElement>,
  mapInstance: React.MutableRefObject<maplibregl.Map | null>,
  updateLayers: () => void
) => {
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
      zoom: 13,
      minZoom: 12,
      maxPitch: 85,
      center: [139.751154, 35.681236],
      pitch: 60,
      bearing: 20,
    })

    mapInstance.current.on("load", () => {
      mapInstance.current?.addControl(new maplibregl.NavigationControl(), "bottom-right")
      updateLayers()
    })

    // styleimagemissingイベントをリッスンして、画像が見つからない場合に処理する
    mapInstance.current.on("styleimagemissing", async (e) => {
      const id = e.id
      const url = `/assets/logos/${id}.webp`
      try {
        const response = await mapInstance.current?.loadImage(url)
        if (response && !mapInstance.current?.hasImage(id)) {
          mapInstance.current?.addImage(id, response.data)
        }
      } catch (error) {
        console.error(`Error loading image: ${url}`, error)
      }
    })
  }
}

const MapApp: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<maplibregl.Map | null>(null)
  const { getLayers } = useViewSiteMain()

  const updateLayers = () => {
    const layers = getLayers()
    const map = mapInstance.current

    if (map?.isStyleLoaded()) {
      layers.forEach((layer) => {
        if (!map.getSource(layer.sourceId)) {
          map.addSource(layer.sourceId, layer.source as SourceSpecification)
        }

        if (!map.getLayer(layer.id)) {
          addLayerToMap(map, layer)
        } else {
          updateExistingLayer(map, layer)
        }
      })
    }
  }

  useEffect(() => {
    initializeMap(mapContainer, mapInstance, updateLayers)

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
