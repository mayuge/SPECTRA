"use client"
import React from "react"
import MapApp from "@/components/organisms/homeSite/ui/map/MapApp"
import HeaderApp from "@/components/organisms/homeSite/ui/HeaderApp"
import DialogApp from "@/components/organisms/homeSite/ui/menu/DialogApp"
import LayerControlApp from "@/components/organisms/homeSite/ui/menu/LayerControlApp"

const HomeSite: React.FC = () => {
  return (
    <div>
      <HeaderApp />
      <DialogApp />
      <LayerControlApp />
      <MapApp />
    </div>
  )
}

export default HomeSite
