"use client" // クライアントサイドでのみ実行

import React, { useRef } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { mapConfig } from "@/components/organisms/homeSite/core/params/params"

const Simple3DMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<maplibregl.Map | null>(null)

  // マップの初期化
  if (mapContainer.current && !mapInstance.current) {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      center: mapConfig.center,
      zoom: mapConfig.zoom,
      pitch: 60,
      bearing: 40,
      style: {
        version: 8,
        sources: {
          "osm-bright-ja": {
            type: "raster",
            tiles: [mapConfig.styleUrls.rasterUrl],
            tileSize: 512,
            minzoom: 10,
            maxzoom: 16,
            attribution: mapConfig.attributions.raster,
          },
          terrain: {
            type: "raster-dem",
            tiles: [mapConfig.styleUrls.demUrl],
            tileSize: 512,
            minzoom: 10,
            maxzoom: 16,
            attribution: mapConfig.attributions.dem,
          },
          "plateau-bldg": {
            type: "vector",
            tiles: [mapConfig.styleUrls.vectorUrl],
            minzoom: 10,
            maxzoom: 16,
            attribution: mapConfig.attributions.vector,
          },
        },
        layers: [
          {
            id: "osm-bright-ja",
            type: "raster",
            source: "osm-bright-ja",
          },
        ],
      },
    })

    map.on("load", () => {
      //map.setTerrain({ source: "terrain", exaggeration: 3 });

      map.addLayer({
        id: "bldg",
        type: "fill-extrusion",
        source: "plateau-bldg",
        "source-layer": "bldg",
        paint: {
          "fill-extrusion-height": ["*", ["get", "z"], 1],
          "fill-extrusion-base": 0,
          "fill-extrusion-color": "#797979",
          "fill-extrusion-opacity": 0.8,
        },
      })

      map.addControl(new maplibregl.NavigationControl(), "top-right")
    })

    mapInstance.current = map
  }

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
}

export default Simple3DMap
