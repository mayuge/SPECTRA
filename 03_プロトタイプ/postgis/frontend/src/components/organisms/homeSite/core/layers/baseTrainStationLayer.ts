// layers/baseTrainStationLayer.ts
import { useState, useEffect } from "react"
import { TextLayer } from "@deck.gl/layers"
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
    getPosition: (d) => [d.lng, d.lat, 10],
    getText: (d) => d.name,
    getSize: 36, // 単位がメートル扱いになる
    sizeUnits: "meters", // これで地図上の距離ベースに

    getTextAnchor: "middle",
    getAlignmentBaseline: "bottom",
    billboard: true,

    getColor: [80, 80, 80],

    fontFamily: "Noto Sans JP Bold, 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', sans-serif",
    fontWeight: "bold",

    stroked: true,
    getOutlineColor: [255, 255, 255],
    outlineWidth: 2,

    maxZoom: 20,
    minZoom: 13,
  })
}

// React で使うフック
export function useStationLayer() {
  const [layer, setLayer] = useState<any>(null)
  const { getAllStation } = useMapApp()

  useEffect(() => {
    getAllStation().then((geojson) => {
      createBaseTrainStationLayer(geojson).then(setLayer)
    })
  }, [])

  return layer
}
