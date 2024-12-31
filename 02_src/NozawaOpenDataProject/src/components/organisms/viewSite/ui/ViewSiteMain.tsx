"use client"
import React from "react"
import MapApp from "@/components/organisms/viewSite/ui/MapApp"
import LayerListBarApp from "@/components/organisms/viewSite/ui/LayerListBarApp"
import DetailInfoDialogApp from "@/components/organisms/viewSite/ui/DetailInfoDialogApp"
import MovieDialogApp from "@/components/organisms/viewSite/ui/MovieDialogApp"
import DisplayInfoApp from "@/components/organisms/viewSite/ui/DisplayInfoApp"
import HeaderApp from "@/components/organisms/viewSite/ui/HeaderApp"
const ViewSiteMain: React.FC = () => {
  return (
    <div className="relative w-full h-screen">
      <HeaderApp />
      <LayerListBarApp />
      <DetailInfoDialogApp />
      <MovieDialogApp />
      <DisplayInfoApp />
      <MapApp />
    </div>
  )
}

export default ViewSiteMain
