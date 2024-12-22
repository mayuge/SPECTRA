"use client"

import React, { useRef, useEffect } from "react"
import maplibregl, { RasterSourceSpecification, GeoJSONSourceSpecification, PropertyValueSpecification, LayerSpecification } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { mapConfig } from "@/components/organisms/viewSite/core/params/params"

// レイヤーの型定義
type Layer = {
  id: string
  type: "raster" | "fill" | "line"
  sourceId: string
  source: RasterSourceSpecification | GeoJSONSourceSpecification
  layout?: {
    visibility?: "visible" | "none"
    "line-join"?: PropertyValueSpecification<"round" | "bevel" | "miter">
    "line-cap"?: PropertyValueSpecification<"butt" | "round" | "square">
  }
  paint: any
}

const MapApp: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<maplibregl.Map | null>(null)

  // レイヤー定義オブジェクト（複数レイヤに対応）
  const layers: Layer[] = [
    {
      id: "konjakumap",
      type: "raster",
      sourceId: "konjakumap",
      source: {
        type: "raster",
        tiles: ["https://ktgis.net/kjmapw/kjtilemap/tokyo50/03/{z}/{x}/{y}.png"],
        tileSize: 512,
        scheme: "tms",
        maxzoom: 16,
        minzoom: 8,
        attribution: "今昔マップ",
      } as RasterSourceSpecification,
      layout: {
        visibility: "visible",
      },
      paint: {
        "raster-opacity": 0.5,
      },
    },
    {
      id: "osm-map",
      type: "raster",
      sourceId: "osm-map",
      source: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png"],
        tileSize: 512,
        attribution: "OpenStreetMap",
      } as RasterSourceSpecification,
      layout: {
        visibility: "visible",
      },
      paint: {
        "raster-opacity": 0.5,
      },
    },
    {
      id: "polygon",
      type: "fill",
      sourceId: "BaseCityBlocks",
      source: {
        type: "geojson",
        data: "/geojson/Block_Tokyo_FeaturesToJSON.geojson",
      } as GeoJSONSourceSpecification,
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["get", "Capacity_面積"],
          0, "#f2f0f7",
          10, "#cbc9e2",
          20, "#9e9ac8",
          50, "#6a51a3"
        ],
        "fill-opacity": 0.7,
      },
    },
    {
      id: "line",
      type: "line",
      sourceId: "LineToeiBus",
      source: {
        type: "geojson",
        data: "/geojson/LineToeiBus.geojson",
      } as GeoJSONSourceSpecification,
      layout: {
        "line-join": "round",
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "#00FF00",
        "line-width": 3,
        "line-opacity": 0.8,
      },
    },
  ]

  // displayMap関数内は空の箱のようにしておき、url等もあとから中身を追加する
  const displayMap = () => {
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