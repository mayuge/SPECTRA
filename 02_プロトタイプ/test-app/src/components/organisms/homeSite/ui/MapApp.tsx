"use client"; // クライアントサイドでのみ実行

import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Simple3DMap() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      center: [139.7024, 35.6598], // 東京・渋谷付近の中心座標
      zoom: 16, // 初期ズームレベル
      pitch: 60, // マップを傾けて3D表示
      bearing: 40, // マップを回転
      style: {
        version: 8,
        sources: {
          // 背景地図（OpenStreetMap 日本語版）
          "osm-bright-ja": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "<a href='https://www.openstreetmap.org/copyright' target='_blank'>© OpenStreetMap contributors</a>",
          },
          // 地形データ（DEM: Digital Elevation Model）
          "terrain": {
            type: "raster-dem",
            tiles: ["https://cyberjapandata.gsi.go.jp/xyz/dem/{z}/{x}/{y}.txt"],
            tileSize: 256,
            maxzoom: 14,
            attribution: "© 国土地理院",
          },
          // 3D都市モデル（Project PLATEAU）
          "plateau-bldg": {
            type: "vector",
            tiles: ["https://indigo-lab.github.io/plateau-lod2-mvt/{z}/{x}/{y}.pbf"],
            minzoom: 10,
            maxzoom: 16,
            attribution: "<a href='https://github.com/indigo-lab/plateau-lod2-mvt'>plateau-lod2-mvt by indigo-lab</a>",
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
    });

    map.on("load", () => {
      // 地形データの適用
      map.setTerrain({ source: "terrain", exaggeration: 1.5 });

      // 3D建物データレイヤを追加
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
      });

      // ズームコントロールを追加
      map.addControl(new maplibregl.NavigationControl(), "top-right");
    });

    return () => {
      map.remove(); // コンポーネントのアンマウント時にマップを削除
    };
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
}
