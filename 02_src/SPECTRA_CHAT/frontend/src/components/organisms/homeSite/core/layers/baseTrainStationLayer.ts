// layers/baseTrainStationLayer.ts
import { useState, useEffect } from "react"
import { CompositeLayer } from "@deck.gl/core"
import { TextLayer, IconLayer } from "@deck.gl/layers"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"
import { companyLogoParams, CompanyKey } from "@/domain/params/companyLogoParams"

// CompositeLayer で駅名テキストと会社ロゴをまとめる
class BaseTrainStationLayer extends CompositeLayer<any> {
  renderLayers() {
    const { data, logoData } = this.props

    return [
      // 背景テキスト（白・太字）
      new TextLayer({
        id: `${this.props.id}-background`,
        data,
        pickable: false,
        characterSet: "auto",
        getPosition: (d) => [d.lng, d.lat, -24],
        getText: (d) => d.name,
        getSize: 32,
        sizeUnits: "meters",
        parameters: { depthTest: false },
        getTextAnchor: "middle",
        getAlignmentBaseline: "bottom",
        billboard: true,
        getColor: [255, 255, 255],
        fontFamily: "Noto Sans JP, 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', sans-serif",
        fontWeight: "900",
        maxZoom: 20,
        minZoom: 13,
        updateTriggers: {
          getText: [], // データが変わったときだけ更新
        },
      }),

      // 前景テキスト（グレー・細め）
      new TextLayer({
        id: `${this.props.id}-foreground`,
        data,
        pickable: false,
        characterSet: "auto",
        getPosition: (d) => [d.lng, d.lat, -24],
        getText: (d) => d.name,
        getSize: 32,
        sizeUnits: "meters",
        parameters: { depthTest: false },
        getTextAnchor: "middle",
        getAlignmentBaseline: "bottom",
        billboard: true,
        getColor: [80, 80, 80],
        fontFamily: "Noto Sans JP, 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', sans-serif",
        fontWeight: "400",
        maxZoom: 20,
        minZoom: 13,
        updateTriggers: {
          getText: [], // データが変わったときだけ更新
        },
      }),

      // 会社ロゴ
      new IconLayer({
        id: `${this.props.id}-logo`,
        data: logoData,
        getPosition: (d) => [d.lng, d.lat, 24], // テキストより少し上に表示
        getIcon: (d) => d.icon,
        getSize: 24,
        sizeUnits: "meters",
        billboard: true,
        updateTriggers: {
          getText: [], // データが変わったときだけ更新
        },
      }),
    ]
  }
}

// 駅データから CompositeLayer を生成
export async function createBaseTrainStationLayer(geojson: any) {
  type StationPoint = {
    lng: number
    lat: number
    name: string
    company?: string
  }

  type LogoPoint = StationPoint & {
    icon: { url: string; width: number; height: number; anchorY: number }
  }

  const points: StationPoint[] = geojson.features.map((f: any) => ({
    lng: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
    name: f.properties?.駅名 || "",
    company: f.properties?.事業者名,
  }))

  const isCompanyKey = (v: string): v is CompanyKey => v in companyLogoParams

  const logoData: LogoPoint[] = points.map((p) => {
    const iconUrl =
      p.company && isCompanyKey(p.company)
        ? `/image/companyLogo/${companyLogoParams[p.company].path}.webp`
        : "/image/companyLogo/default.webp"

    return {
      ...p,
      icon: {
        url: iconUrl,
        width: 100,
        height: 100,
        anchorY: 100,
      },
    }
  })

  return new BaseTrainStationLayer({
    id: "base-train-station-layer",
    data: points,
    logoData,
  })
}

// React フックとして外部から参照可能
export function useStationLayer() {
  const [layer, setLayer] = useState<any>(null)
  const { getAllStation } = useMapApp()

  useEffect(() => {
    let mounted = true

    getAllStation().then((geojson) => {
      createBaseTrainStationLayer(geojson).then((layer) => {
        if (mounted) setLayer(layer)
      })
    })

    return () => {
      mounted = false
    }
  }, [getAllStation])

  return layer
}
