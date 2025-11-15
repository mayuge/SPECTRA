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
import { TRAIN_STATION_LAYER, TRAIN_LINE_LAYER } from "@/domain/params/customLayerName"

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

    const sourceId = TRAIN_STATION_LAYER
    const layerId = TRAIN_STATION_LAYER

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
    addHoverPopup(layerId)
  }

  const trainLineLayer = (geojson: FeatureCollection) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return

    const sourceId = TRAIN_LINE_LAYER
    const layerId = TRAIN_LINE_LAYER

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
      layout: { "line-cap": "round", "line-join": "round", visibility: "visible" },
      paint: {
        // JSONから動的に線色を取得
        "line-color": [
          "case",
          ["has", ["get", "事業者名"], ["literal", trainParams]],
          [
            "coalesce",
            ["get", ["get", "路線名"], ["get", ["get", "事業者名"], ["literal", trainParams]]],
            "#808080", // 路線名が存在しない場合のデフォルト色
          ],
          "#808080", // 事業者名が存在しない場合
        ],

        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 10],
      },
    }
    map.addLayer(layer)
    addHoverPopup(layerId)
  }

  const addHoverPopup = (layerId: string) => {
    const { getMapInstance } = useMapInstance() as IMapInstance
    const map = getMapInstance()
    if (!map) return
    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "1000px",
    })

    map.on("mousemove", layerId, (e) => {
      const feature = e.features?.[0]
      if (!feature) return

      const props = feature.properties ?? {}

      const rows = Object.entries(props)
        .map(
          ([key, value]) =>
            `<tr>
         <th style="border:1px solid #ccc; padding:2px 4px; background:#f5f5f5;">${key}</th>
         <td style="border:1px solid #ccc; padding:2px 4px;">${value}</td>
       </tr>`
        )
        .join("")

      popup
        .setLngLat(e.lngLat)
        .setHTML(
          `<table style="font-size:12px; border-collapse:collapse; background:white;">
      ${rows}
   </table>`
        )
        .addTo(map)
    })

    map.on("mouseleave", layerId, () => {
      popup.remove()
    })
  }

  return {
    trainStationLayer,
    trainLineLayer,
  }
}

export default useMapCustomLayer
