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
          "konjyaku-map": {
            type: "raster",
            tiles: ["https://ktgis.net/kjmapw/kjtilemap/tokyo50/03/{z}/{x}/{y}.png"],
            tileSize: 256,
            scheme: "tms",
            minzoom: 10,
            maxzoom: 16,
            attribution: "国土地理院 今昔マップ",
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
          // {
          //   id: "konjyaku-map-layer",
          //   type: "raster",
          //   source: "konjyaku-map",
          //   minzoom: 0,
          //   maxzoom: 18,
          // },
        ],
      },
    })

    map.on("load", () => {
      // ここでterrainを設定したい場合はコメント解除
      // map.setTerrain({ source: "terrain", exaggeration: 3 });

      // GeoJSONファイルのパスを指定
      const geojsonPath = "/geojson/Block_Tokyo_FeaturesToJSON.geojson"
      const lineToeiBusPath = "/geojson/LineToeiBus.geojson"

      map.addSource("BaseCityBlocks", {
        type: "geojson",
        data: geojsonPath,
      })

      map.addSource("LineToeiBus", {
        type: "geojson",
        data: lineToeiBusPath,
      })

      // ポリゴンの背景色を設定します
      map.addLayer({
        id: "polygon",
        type: "fill",
        source: "BaseCityBlocks",
        layout: {},
        paint: {
          // Capacity_面積 の値に応じた色分け
          "fill-color": [
            "interpolate", // 値に基づいて色を補間
            ["linear"], // 線形補間を使用
            ["get", "Capacity_面積"], // GeoJSONの "Capacity_面積" プロパティを取得
            0,
            "#f2f0f7", // 最小値の色 (薄い)
            10,
            "#cbc9e2", // 中間値の色
            20,
            "#9e9ac8", // より濃い色
            50,
            "#6a51a3", // 最大値の色 (濃い)
          ],
          "fill-opacity": 0.5, // ポリゴンの透明度
        },
      })

      // ラインの背景色を設定します
      map.addLayer({
        id: "line",
        type: "line", // ラインを表示するために "line" を指定
        source: "LineToeiBus",
        layout: {
          "line-join": "round", // ラインの接合部分を滑らかにする
          "line-cap": "round", // ラインの端を滑らかにする
        },
        paint: {
          "line-color": "#00FF00", // ラインの色
          "line-width": 3, // ラインの幅
          "line-opacity": 0.8, // ラインの透明度
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
    map.on("click", "polygon", (e) => {
      if (!e.features || e.features.length === 0) return

      const properties = e.features[0].properties // プロパティを取得
      const popupContent = `
        <div>
          <strong>地区名:</strong> ${properties.NAME || "不明"}<br>
          <strong>都道府県:</strong> ${properties.KEN_NAME || "不明"}<br>
          <strong>市区町村:</strong> ${properties.SHI_NAME || "不明"}<br>
          <strong>大字名:</strong> ${properties.OAZA_NAME || "不明"}<br>
          <strong>小字名:</strong> ${properties.KOAZA_NAME || "不明"}<br>
          <strong>総面積:</strong> ${properties.SUM_AREA ? properties.SUM_AREA.toFixed(3) : "データなし"} 平方km<br>
          <strong>容量面積:</strong> ${properties.Capacity_面積 || "データなし"} 平方km<br>
          <strong>形状の長さ:</strong> ${properties.Shape_Length ? properties.Shape_Length.toFixed(3) : "データなし"} km<br>
          <strong>形状の面積:</strong> ${properties.Shape_Area ? properties.Shape_Area.toExponential(3) : "データなし"} 平方m<br>
        </div>
      `

      new maplibregl.Popup()
        .setLngLat(e.lngLat) // クリック位置にポップアップを表示
        .setHTML(popupContent) // ポップアップのHTMLコンテンツを設定
        .addTo(map)
    })

    // マウスオーバー時のカーソル変更
    map.on("mouseenter", "polygon", () => {
      map.getCanvas().style.cursor = "pointer" // ポインターに変更
    })
    map.on("mouseleave", "polygon", () => {
      map.getCanvas().style.cursor = "" // デフォルトに戻す
    })

    mapInstance.current = map
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
    </div>
  )
}

export default Simple3DMap
