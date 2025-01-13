"use client"
import React, { useEffect } from "react"
import MapApp from "@/components/organisms/viewSite/ui/MapApp"
import LayerListBarApp from "@/components/organisms/viewSite/ui/LayerListBarApp"
import DetailInfoDialogApp from "@/components/organisms/viewSite/ui/infoDialogApp"
import DisplayInfoApp from "@/components/organisms/viewSite/ui/DisplayInfoApp"
import HeaderApp from "@/components/organisms/viewSite/ui/HeaderApp"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import ModeDialogApp from "@/components/organisms/viewSite/ui/ModeDialogApp"

const ViewSiteMain: React.FC = () => {
  const { useCallback } = useViewSiteMain()
  useEffect(() => {
    useCallback()
  }, [])
  //1分ごとに情報更新
  useEffect(() => {
    const interval = setInterval(() => {
      useCallback()
    }, 60000) // 1分（60秒）ごとに実行

    return () => clearInterval(interval)
  }, [useCallback])

  return (
    <div className="relative w-full h-screen">
      <HeaderApp />
      <LayerListBarApp />
      <ModeDialogApp/>
      <DetailInfoDialogApp />
      <DisplayInfoApp />
      <MapApp />
    </div>
  )
}

export default ViewSiteMain
