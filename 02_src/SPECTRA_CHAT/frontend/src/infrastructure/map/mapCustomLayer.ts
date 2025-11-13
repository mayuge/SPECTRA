import useMapInstance from "@/infrastructure/map/mapInstance"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import type { FeatureCollection } from "geojson"
import maplibregl, {
  type GeoJSONSourceSpecification,
  type LineLayerSpecification,
  type SymbolLayerSpecification,
} from "maplibre-gl"
import trainParams from "@/domain/params/trainParams.json"

const useMapCustomLayer = (): IMapCustomLayer => {
  const loadCompanyIcons = async (map: maplibregl.Map) => {
    const promises = Object.entries(trainParams).map(async ([company, { path }]) => {
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

  const trainStationLayer = async (geojson: FeatureCollection) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return

    const sourceId = "train-station"
    const layerId = "train-station-layer"

    const source: GeoJSONSourceSpecification = { type: "geojson", data: geojson }

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, source)
    } else {
      ;(map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(geojson)
    }

    if (map.getLayer(layerId)) return

    await loadCompanyIcons(map)

    const layer: SymbolLayerSpecification = {
      id: layerId,
      type: "symbol",
      source: sourceId,
      layout: {
        visibility: "visible",
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

  const trainLineLayer = (geojson: FeatureCollection) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return

    const sourceId = "train-line"
    const layerId = "train-line-layer"

    const source: GeoJSONSourceSpecification = { type: "geojson", data: geojson }

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, source)
    } else {
      ;(map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(geojson)
    }

    if (map.getLayer(layerId)) return

    const layer: LineLayerSpecification = {
      id: layerId,
      type: "line",
      source: sourceId,
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        // JSONから動的に線色を取得
        "line-color": [
          "case",
          ["has", ["get", "事業者名"], ["literal", trainParams]],
          ["get", ["get", "路線名"], ["get", ["get", "事業者名"], ["literal", trainParams]]],
          "#808080",
        ],
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 10],
      },
    }

    map.addLayer(layer)
  }

  return {
    trainStationLayer,
    trainLineLayer,
  }
}

export default useMapCustomLayer
