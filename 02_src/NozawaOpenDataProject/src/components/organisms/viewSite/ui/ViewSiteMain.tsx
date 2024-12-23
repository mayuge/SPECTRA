"use client"
import React from "react"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import MapApp from "@/components/organisms/viewSite/ui/MapApp"
import LayerListBarApp from "@/components/organisms/viewSite/ui/LayerListBarApp"
import DetailInfoDialogApp from "@/components/organisms/viewSite/ui/DetailInfoDialogApp"
import MovieDialogApp from "@/components/organisms/viewSite/ui/MovieDialogApp"
import HeaderApp from "@/components/organisms/viewSite/ui/HeaderApp"
const ViewSiteMain: React.FC = () => {
  const {
    buttonClicked,
    RouteToHomeSite,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeDataCallback,
  } = useViewSiteMain()

  return (
    <div className="relative w-full h-screen">
      <HeaderApp />
      <LayerListBarApp />
      <DetailInfoDialogApp />
      <MovieDialogApp />

      <MapApp />
    </div>
  )
}

export default ViewSiteMain
