"use client"
import React, { useEffect } from "react"
import MapApp from "@/components/organisms/viewSite/ui/MapApp"
import LayerListBarApp from "@/components/organisms/viewSite/ui/LayerListBarApp"
import InfoDialogApp from "@/components/organisms/viewSite/ui/InfoDialogApp"
import DisplayInfoApp from "@/components/organisms/viewSite/ui/DisplayInfoApp"
import DisplaySwitchApp from "@/components/organisms/viewSite/ui/DisplaySwitchApp"
import HeaderApp from "@/components/organisms/viewSite/ui/HeaderApp"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import ModeDialogApp from "@/components/organisms/viewSite/ui/ModeDialogApp"

const ViewSiteMain: React.FC = () => {
  const { useViewSiteCallback, helloCycleInfoCallback, docomoBikeShareInfoCallback } =
    useViewSiteMain()
  useEffect(() => {
    useViewSiteCallback()
  }, [])
  //1分ごとに情報更新
  useEffect(() => {
    const interval = setInterval(() => {
      useViewSiteCallback()
    }, 60000) // 1分（60秒）ごとに実行

    return () => clearInterval(interval)
  }, [useViewSiteCallback])

  return (
    <div className="relative w-full h-screen">
      <HeaderApp />
      <LayerListBarApp />
      <ModeDialogApp />
      <InfoDialogApp />
      <DisplaySwitchApp />
      <DisplayInfoApp />
      <MapApp />
    </div>
  )
}

export default ViewSiteMain
