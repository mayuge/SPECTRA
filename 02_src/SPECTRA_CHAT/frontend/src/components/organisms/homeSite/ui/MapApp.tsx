import Button from "@/components/atoms/buttons/Button"
import { useMapApp } from "@/components/organisms/homeSite/core/application/useMapApp"

const MapApp = () => {
  const { mapContainerRef } = useMapApp()

  return (
    <div style={{ width: "100svw", height: "100svh", position: "relative" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 0 }}
      />
      <div className="absolute top-16 right-12">
        <Button variant="btn-light" size="normal" text="鉄道" onClick={() => {}} />
      </div>
    </div>
  )
}

export default MapApp
