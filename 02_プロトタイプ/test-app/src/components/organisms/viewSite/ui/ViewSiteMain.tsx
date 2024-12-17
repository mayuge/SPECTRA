"use client"
import React from "react"

import DialogHeader from "@/components/molecules/header/DialogHeader"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import MapApp from "@/components/organisms/viewSite/ui/MapApp"
import Card from "@/components/molecules/frames/Card"
import LayerListApp from "@/components/organisms/viewSite/ui/LayerListApp"
import DetailInfoDialogApp from "@/components/organisms/viewSite/ui/DetailInfoDialogApp"
import MovieDialogApp from "@/components/organisms/viewSite/ui/MovieDialogApp"

const ViewSiteMain: React.FC = () => {
  const {
    buttonClicked,
    RouteToHomeSite,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeDataCallback,
  } = useViewSiteMain()

  return (
    <div className="relative w-full h-screen">
      <MapApp />
      <LayerListApp />
      <DetailInfoDialogApp />
      <MovieDialogApp />
    </div>
  )
}

export default ViewSiteMain
