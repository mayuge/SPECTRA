import useMapInstance from "@/infrastructure/map/mapInstance"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import type { FeatureCollection } from "geojson"
import maplibregl, {
  type GeoJSONSourceSpecification,
  type SymbolLayerSpecification,
} from "maplibre-gl"
import { companyLogoParams } from "@/domain/params/companyLogoParams"

const useMapCustomLayer = (): IMapCustomLayer => {
  /**
   * 鉄道会社ロゴをすべて読み込み
   */
  const loadCompanyIcons = async (map: maplibregl.Map) => {
    const promises = Object.entries(companyLogoParams).map(async ([company, { path }]) => {
      const iconId = `${company}-icon`
      const iconUrl = `/image/companyLogo/${path}.webp`

      if (!map.hasImage(iconId)) {
        try {
          const image = await map.loadImage(iconUrl)
          map.addImage(iconId, image.data)
        } catch (err) {
          console.error(`❌ Failed to load icon for ${company}:`, err)
        }
      }
    })

    await Promise.all(promises)
  }

  /**
   * 駅名・鉄道会社ロゴ画像を追加
   */
  const trainStationLayer = async (geojson: FeatureCollection) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return

    const sourceId = "train-station"
    const layerId = "train-station-layer"

    const source: GeoJSONSourceSpecification = {
      type: "geojson",
      data: geojson,
    }

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, source)
    } else {
      ;(map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(geojson)
    }

    await loadCompanyIcons(map)

    if (!map.getLayer(layerId)) {
      const layer: SymbolLayerSpecification = {
        id: layerId,
        type: "symbol",
        source: sourceId,
        layout: {
          "icon-image": ["concat", ["get", "事業者名"], "-icon"],
          "icon-size": 0.12,
          "icon-allow-overlap": true,
          "text-field": ["get", "駅名"],
          "text-font": ["Noto Sans CJK JP Bold"],
          "text-size": 8,
          "text-anchor": "top",
          "text-offset": [0, 1],
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#505050",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
        },
      }

      map.addLayer(layer)
    }
  }

  return {
    trainStationLayer,
  }
}

export default useMapCustomLayer
