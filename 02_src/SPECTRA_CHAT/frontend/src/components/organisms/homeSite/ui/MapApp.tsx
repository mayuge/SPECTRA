import Button from "@/components/atoms/buttons/Button"
import { useMapApp } from "@/components/organisms/homeSite/core/application/useMapApp"
import "maplibre-gl/dist/maplibre-gl.css"
const MapApp = () => {
  const { mapContainerRef, toggleTrainLayer, getDisplayLayer } = useMapApp()

  return (
    <div style={{ width: "100svw", height: "100svh", position: "relative" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 0 }}
      />
      <div className="absolute top-20 right-12 z-10 bg-gray-30 p-4 rounded-lg flex items-center gap-2">
        <Button
          variant={getDisplayLayer("train") ? "btn-light" : "btn-dark"}
          size="small"
          shape="circle"
          iconLeft="train"
          text={getDisplayLayer("train") ? "鉄道" : ""}
          onClick={toggleTrainLayer}
        />
        <Button
          variant={getDisplayLayer("train") ? "btn-light" : "btn-dark"}
          size="small"
          shape="circle"
          iconLeft="train"
          text={getDisplayLayer("train") ? "ハザード" : ""}
          onClick={toggleTrainLayer}
        />
        <Button
          variant={getDisplayLayer("train") ? "btn-light" : "btn-dark"}
          size="small"
          shape="circle"
          iconLeft="train"
          text={getDisplayLayer("train") ? "用途地域" : ""}
          onClick={toggleTrainLayer}
        />
      </div>
    </div>
  )
}

export default MapApp
