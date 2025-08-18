// layers/baseTrainStationLayer.ts
import { useState, useEffect } from "react"
import { CompositeLayer } from "@deck.gl/core"
import { TextLayer } from "@deck.gl/layers"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"

class BaseTrainStationLayer extends CompositeLayer<any> {
  renderLayers() {
    const { data } = this.props

    return [
      // 背景（白・太字）
      new TextLayer({
        id: `${this.props.id}-background`,
        data,
        pickable: false,
        characterSet: "auto",
        getPosition: (d) => [d.lng, d.lat, 10],
        getText: (d) => d.name,
        getSize: 36, // サイズは同じ
        sizeUnits: "meters",
        parameters: { depthTest: false },
        getTextAnchor: "middle",
        getAlignmentBaseline: "bottom",
        billboard: true,
        getColor: [255, 255, 255], // 白
        fontFamily:
          "Noto Sans JP, 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', sans-serif",
        fontWeight: "900", // 太め
        maxZoom: 20,
        minZoom: 13,
      }),

      // 前景（グレー・細め）
      new TextLayer({
        id: `${this.props.id}-foreground`,
        data,
        pickable: false,
        characterSet: "auto",
        getPosition: (d) => [d.lng, d.lat, 10],
        getText: (d) => d.name,
        getSize: 36,
        sizeUnits: "meters",
        parameters: { depthTest: false },
        getTextAnchor: "middle",
        getAlignmentBaseline: "bottom",
        billboard: true,
        getColor: [80, 80, 80], // グレー
        fontFamily:
          "Noto Sans JP, 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', sans-serif",
        fontWeight: "400", // 細め（lighter）
        maxZoom: 20,
        minZoom: 13,
      }),
    ]
  }
}

export async function createBaseTrainStationLayer(geojson: any) {
  const points = geojson.features.map((f: any) => ({
    lng: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
    name: f.properties?.駅名 || "",
  }))

  return new BaseTrainStationLayer({
    id: "base-train-station-layer",
    data: points,
  })
}

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
