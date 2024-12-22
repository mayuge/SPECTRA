import React, { useRef, useEffect } from "react"
import maplibregl, { RasterSourceSpecification, GeoJSONSourceSpecification } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

const MapApp: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<maplibregl.Map | null>(null)

  // レイヤー定義オブジェクト（複数レイヤに対応）
  const layers = [

    {
      id: "konjakumap",
      type: "raster" as "raster",
      source: {
        type: "raster",
        tiles: ["https://ktgis.net/kjmapw/kjtilemap/tokyo50/03/{z}/{x}/{y}.png"],
        tileSize: 512,
        scheme: "tms",
        maxzoom: 16,
        minzoom: 8,
        attribution: "今昔マップ",
      } as RasterSourceSpecification,
      paint: {
        "raster-opacity": 0.5,
      },
    },    {
      id: "osm-map",
      type: "raster" as "raster",
      source: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png"],
        tileSize: 512,
        attribution: "OpenStreetMap",
      } as RasterSourceSpecification,
      paint: {
        "raster-opacity": 0.5,
      },
    },
    {
      id: "polygon",
      type: "fill" as "fill",
      source: {
        type: "geojson",
        data: "/geojson/Block_Tokyo_FeaturesToJSON.geojson",
      } as GeoJSONSourceSpecification,
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
      type: "line" as "line",
      source: {
        type: "geojson",
        data: "/geojson/LineToeiBus.geojson",
      } as GeoJSONSourceSpecification,

      paint: {
        "line-color": "#00FF00",
        "line-width": 3,
        "line-opacity": 0.8,
      },
    },
   
  ]

  //displayMap内は空の箱のようにしておき、url等もあとから中身を追加する
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
          mapInstance.current?.addSource(layer.id, layer.source)

          // レイヤーを追加
          mapInstance.current?.addLayer({
            id: layer.id,
            type: layer.type,
            source: layer.id,
            paint: layer.paint,
          })
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
