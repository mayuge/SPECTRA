"use client"
import React from "react"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import TextLabel from "@/components/atoms/labels/TextLabel"

const ProfileApp: React.FC = () => {
  const { routeToHomeSite } = useViewSiteMain()
  return (
    <div className="w-full flex px-4 py-2 gap-4">
      <div className="w-full h-[400px] bg-back shadow-black shadow-md">
        <div className="p-2">
          <TextLabel text="マイプロフィール" size="normal" bold={true} isBlack={false} />
        </div>
      </div>
      <div className="w-full h-[400px] bg-back shadow-black shadow-md">
        <div className="p-2">
          <TextLabel text="所属プロジェクト" size="normal" bold={true} isBlack={false} />
        </div>
      </div>
    </div>
  )
}

export default ProfileApp
