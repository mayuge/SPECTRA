"use client"
import React from "react"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

import PullTab from "@/components/atoms/buttons/PullTab"

const LayerListBarApp: React.FC = () => {
  const { setLayerBarOpen, getLayerBarOpen } = useViewSiteMain()

  if (!getLayerBarOpen()) {
    return (
      <div className="relative z-10 w-min h-calc-100vh overflow-y-auto no-scrollbar flex items-center">
        <PullTab
          position="left"
          size="mini"
          variant="pullTab-light"
          icon="arrow_right"
          isShadow={true}
          onClick={() => {
            setLayerBarOpen(true)
          }}
        />
      </div>
    )
  }

  return (
    <div className="relative z-10 flex items-center max-w-md">
      <div className="h-calc-100vh bg-white shadow-lg shadow-black overflow-y-auto no-scrollbar"></div>
      <PullTab
        position="left"
        size="mini"
        variant="pullTab-light"
        icon="arrow_left"
        isShadow={true}
        onClick={() => {
          setLayerBarOpen(false)
        }}
      />
    </div>
  )
}

export default LayerListBarApp
