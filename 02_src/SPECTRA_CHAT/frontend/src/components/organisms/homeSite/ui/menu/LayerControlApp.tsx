"use client"
import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import { useLayerControlApp } from "@/components/organisms/homeSite/core/application/menu/useLayerControlApp"
const LayerControlApp: React.FC = () => {
  const { toggleTrainLayer, toggleCycleLayer, getDisplayLayer } = useLayerControlApp()
  return (
    <div className="absolute top-20 right-16 z-10 bg-gray-30 px-4 py-3">
      <div className="pb-2">
        <TextLabel text="レイヤー切替" size="small" isBlack={false} />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={getDisplayLayer("base-train-station-layer") ? "btn-light" : "btn-dark"}
          size="small"
          shape="square"
          iconLeft="train"
          text="鉄道"
          onClick={toggleTrainLayer}
        />
        <Button
          variant={getDisplayLayer("docomo-bike-share-station-layer") ? "btn-light" : "btn-dark"}
          size="small"
          shape="square"
          iconLeft="directions_bike"
          text="サイクルポート"
          onClick={toggleCycleLayer}
        />
      </div>
    </div>
  )
}

export default LayerControlApp
