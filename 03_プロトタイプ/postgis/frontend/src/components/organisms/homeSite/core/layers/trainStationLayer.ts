import { GeoJsonLayer } from "@deck.gl/layers"
import useMapApp from "@/components/organisms/homeSite/core/application/useMapApp"
const { getAllStation } = useMapApp()
export const trainStationLayer = new GeoJsonLayer({
  id: "train-station-layer",
  data: getAllStation(),
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
