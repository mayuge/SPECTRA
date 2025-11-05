/* eslint-disable react-hooks/rules-of-hooks */
import maplibregl, { GeoJSONSourceSpecification, SymbolLayerSpecification } from "maplibre-gl"
import { useReqTrainApiAdapter } from "@/infrastructure/adapters/httpClientAdapters"

import { companyLogoParams } from "@/domain/params/companyLogoParams"

async function loadCompanyIcons(map: maplibregl.Map) {
  const promises = Object.entries(companyLogoParams).map(async ([company, { path }]) => {
    const iconId = `${company}-icon`
    const iconUrl = `/image/companyLogo/${path}.webp`

    if (!map.hasImage(iconId)) {
      try {
        // ✅ Promise版API
        const image = await map.loadImage(iconUrl)
        if (!map.hasImage(iconId)) {
          map.addImage(iconId, image.data)
        }
      } catch (err) {
        console.error(`Failed to load icon for ${company}:`, err)
      }
    }
  })

  await Promise.all(promises)
}

export async function addTrainStationLayer(map: maplibregl.Map) {
  const { getAllStation } = useReqTrainApiAdapter()
  const geojson = await getAllStation()

  const source: GeoJSONSourceSpecification = {
    type: "geojson",
    data: geojson,
  }

  if (!map.getSource("train-station")) {
    map.addSource("train-station", source)
  } else {
    ;(map.getSource("train-station") as maplibregl.GeoJSONSource).setData(geojson)
  }

  await loadCompanyIcons(map)

  const layer: SymbolLayerSpecification = {
    id: "base-train-station-layer",
    type: "symbol",
    source: "train-station",
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
      "text-halo-color": "#ffffff", // テキストの縁取りの色を設定
      "text-halo-width": 1, // テキストの縁取りの幅を設定
    },
  }

  if (!map.getLayer("base-train-station-layer")) {
    map.addLayer(layer)
  }
}
