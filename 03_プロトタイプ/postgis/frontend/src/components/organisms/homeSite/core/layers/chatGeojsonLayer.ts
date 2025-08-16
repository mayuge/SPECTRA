import { GeoJsonLayer } from "@deck.gl/layers"
import { useGeojsonStateStoreAdapter } from "@/infrastructure/adapters/storeAdapters"

export const chatGeojsonLayer = () => {
  const { getGeojson } = useGeojsonStateStoreAdapter()

  const latestGeojson = getGeojson()[getGeojson().length - 1]

  const layer = new GeoJsonLayer({
    id: "chat-geojson-layer",
    data: latestGeojson,
    minZoom: 0,
    maxZoom: 16,
    getFillColor: [250, 250, 250, 255],
    getLineColor: [0, 0, 255, 255],
    lineWidthMinPixels: 5,
  })

  return layer
}
