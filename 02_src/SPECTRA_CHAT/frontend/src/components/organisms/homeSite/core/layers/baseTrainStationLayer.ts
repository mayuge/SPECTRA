import maplibregl, { GeoJSONSourceSpecification, SymbolLayerSpecification } from "maplibre-gl"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"
import { companyLogoParams } from "@/domain/params/companyLogoParams"

const { getAllStation } = useMapApp()

async function loadCompanyIcons(map: maplibregl.Map) {
  const promises = Object.entries(companyLogoParams).map(async ([company, { path }]) => {
    const iconId = `${company}-icon`
    const iconUrl = `/image/companyLogo/${path}.webp`

    if (!map.hasImage(iconId)) {
      try {
        const response = await fetch(iconUrl)
        const blob = await response.blob()
        const imageBitmap = await createImageBitmap(blob)
        if (!map.hasImage(iconId)) {
          map.addImage(iconId, imageBitmap)
        }
      } catch (err) {
        console.error(`Failed to load icon for ${company}:`, err)
      }
    }
  })

  await Promise.all(promises)
}

export async function addTrainStationLayer(map: maplibregl.Map) {
  const geojson = await getAllStation()

  const source: GeoJSONSourceSpecification = {
    type: "geojson",
    data: geojson,
  }

  if (!map.getSource("station-points")) {
    map.addSource("station-points", source)
  } else {
    ;(map.getSource("station-points") as maplibregl.GeoJSONSource).setData(geojson)
  }

  await loadCompanyIcons(map)

  const layer: SymbolLayerSpecification = {
    id: "station-layer",
    type: "symbol",
    source: "station-points",
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

  if (!map.getLayer("station-layer")) {
    map.addLayer(layer)
  }
}
