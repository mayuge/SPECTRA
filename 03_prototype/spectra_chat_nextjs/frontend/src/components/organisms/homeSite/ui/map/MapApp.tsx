import { useMapApp } from "@/components/organisms/homeSite/core/application/map/useMapApp"
import "maplibre-gl/dist/maplibre-gl.css"
const MapApp = () => {
  const { mapContainerRef } = useMapApp()

  return (
    <div style={{ width: "100svw", height: "100svh", position: "relative" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 0 }}
      />
    </div>
  )
}

export default MapApp
