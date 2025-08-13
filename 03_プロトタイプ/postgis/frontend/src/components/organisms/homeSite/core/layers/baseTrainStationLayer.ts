// layers/baseTrainStationLayer.ts
import { useState, useEffect } from "react"
import { TextLayer } from "@deck.gl/layers"
import { COORDINATE_SYSTEM } from "@deck.gl/core"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"

// TextLayer を作成する関数
export async function createBaseTrainStationLayer(geojson: any) {
  const points = geojson.features.map((f: any) => ({
    lng: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
    name: f.properties?.n05_011 || "",
  }))
  return new TextLayer({
    id: "base-train-station-layer",
    data: points,
    pickable: false,
    characterSet: "auto",
    getPosition: (d) => [d.lng, d.lat, 10], // Z方向に少し浮かせる
    getText: (d) => d.name,
    sizeMaxPixels: 12,
    sizeMinPixels: 4,
    sizeScale: 12,
    getSize: (d) => {
      console.log("Text size for station:", d)
      return d.name.length > 5 ? 8 : 12 // 名前の長さに応じてサイズを調整,
    },
    getTextAnchor: "middle",
    getAlignmentBaseline: "bottom",
    fontFamily: "sans-serif",
    stroked: false, // 縁取りではなく背景で代用
    billboard: true, // Billboard 無効化
    getColor: [50, 50, 50],
    background: true,
    maxZoom: 20, // 最大ズームレベル
    minZoom: 13,
    backgroundPadding: [-0.5, -0.5, -0.5, -0.5],
    getBackgroundColor: [255, 255, 255, 230], // 白背景で縁取り代用
  })
}

// React で使うフック
export function useStationLayer() {
  const [layer, setLayer] = useState<any>(null)
  const { getAllStation } = useMapApp() // フック内で呼ぶ

  useEffect(() => {
    getAllStation().then((geojson) => {
      createBaseTrainStationLayer(geojson).then(setLayer)
    })
  }, [])

  return layer
}
