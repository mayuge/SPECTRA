import { GeoJsonLayer } from "@deck.gl/layers"

export const trainStationLayer = new GeoJsonLayer({
  id: "train-station-layer",
  data: "http://localhost:9000/collections/public.n05_23_station2/items",
  minZoom: 0,
  maxZoom: 16,
  getFillColor: [255, 0, 0, 180],
  pickable: true,
  pointRadiusUnits: "pixels",
  getPointRadius: 3,
  onClick: (info) => {
    if (info.object) {
      alert(`Feature clicked: ${JSON.stringify(info.object.properties)}`)
    }
  },
})
