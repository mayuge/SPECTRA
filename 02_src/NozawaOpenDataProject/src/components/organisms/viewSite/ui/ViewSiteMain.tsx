"use client"
import React, { useEffect } from "react"
import MapApp from "@/components/organisms/viewSite/ui/MapApp"
import LayerListBarApp from "@/components/organisms/viewSite/ui/LayerListBarApp"
import DetailInfoDialogApp from "@/components/organisms/viewSite/ui/infoDialogApp"
import MovieDialogApp from "@/components/organisms/viewSite/ui/MovieDialogApp"
import DisplayInfoApp from "@/components/organisms/viewSite/ui/DisplayInfoApp"
import HeaderApp from "@/components/organisms/viewSite/ui/HeaderApp"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const ViewSiteMain: React.FC = () => {
  const { useCallback } = useViewSiteMain()
  useEffect(() => {
    useCallback()
  }, [])
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
