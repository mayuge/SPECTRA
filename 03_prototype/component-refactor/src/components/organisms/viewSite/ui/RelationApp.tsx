"use client"
import React from "react"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import TextLabel from "@/components/atoms/labels/TextLabel"

const RelationApp: React.FC = () => {
  const { routeToHomeSite } = useViewSiteMain()
  return (
    <div className="w-full px-4 pb-2">
      <div className="w-full h-[600px] bg-back shadow-black shadow-md">
        <div className="p-2">
          <TextLabel text="人物相関図" size="normal" bold={true} isBlack={false} />
        </div>
      </div>
    </div>
  )
}

export default RelationApp
