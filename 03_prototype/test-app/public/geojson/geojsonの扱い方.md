## geojsonファイルをmaplibreで地図上に表示するやり方

- ArcGISで表示したい範囲のみのデータに加工しておく
- FeatureToJSONでshp形式からgeojson形式のファイルに変換する

## 実際のコード

```ts
"use client" // クライアントサイドでのみ実行

import React, { useRef, useEffect } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { mapConfig } from "@/components/organisms/viewSite/core/params/params"

const Simple3DMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return

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
      // ここでterrainを設定したい場合はコメント解除
      // map.setTerrain({ source: "terrain", exaggeration: 3 });

      // GeoJSONファイルのパスを指定
      const baseCityBlocksPath = "/geojson/Block_Tokyo_FeaturesToJSON.geojson"
      const

      map.addSource("BaseCityBlocks", {
        type: "geojson",
        data: baseCityBlocksPath,
      })

      // ポリゴンの背景色を設定します
      map.addLayer({
        id: "polygon",
        type: "fill",
        source: "BaseCityBlocks",
        layout: {},
        paint: {
          "fill-color": "#99CCFF",
          "fill-opacity": 0.3,
        },
      })

      // ポリゴンの枠線を設定します
      map.addLayer({
        id: "outline",
        type: "line",
        source: "BaseCityBlocks",
        layout: {},
        paint: {
          "line-color": "#000080",
          "line-width": 2,
        },
      })

      // 3D建物のレイヤーを追加します
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

      map.addControl(new maplibregl.NavigationControl(), "bottom-right")
    })

    mapInstance.current = map
  }, [])

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
}

export default Simple3DMap

```
