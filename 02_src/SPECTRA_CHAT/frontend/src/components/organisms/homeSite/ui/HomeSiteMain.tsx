"use client"
import React from "react"
import MapApp from "@/components/organisms/homeSite/ui/MapApp"
import HeaderApp from "@/components/organisms/homeSite/ui/HeaderApp"
import DialogApp from "@/components/organisms/homeSite/ui/DialogApp"
import ImageButton from "@/components/atoms/buttons/ImageButton"
import TextLabel from "@/components/atoms/labels/TextLabel"

const HomeSite: React.FC = () => {
  return (
    <div>
      <HeaderApp />
      <DialogApp />
      <MapApp />
    </div>
  )
}

export default HomeSite
