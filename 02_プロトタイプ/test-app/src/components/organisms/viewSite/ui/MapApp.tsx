import React, { useRef, useEffect } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

const MapApp: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<maplibregl.Map | null>(null)

  // レイヤー定義オブジェクト（複数レイヤに対応）
  const layers = [
    {
      id: "osm-map",
      type: "raster" as "raster", // 'raster' 型として指定
      source: {
        type: "raster", // 'raster' ソースを指定
        tiles: ["https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "OpenStreetMap",
      } as maplibregl.RasterSourceSpecification, // 型キャストを追加
    },
  ]

  // 地図の初期化
  const initializeMap = () => {
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {}, // 最初は空で開始
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
          mapInstance.current?.addSource(layer.id, layer.source)

          // レイヤーを追加
          mapInstance.current?.addLayer({
            id: layer.id,
            type: layer.type,
            source: layer.id,
          })
        })
      })
    }
  }

  useEffect(() => {
    initializeMap()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (<div className="absolute inset-0 z-0" >
    <div ref={mapContainer} className="w-full h-full"></div>
    </div>)
}

export default MapApp
