"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import Card from "@/components/molecules/frames/Card"

const HeaderApp: React.FC = () => {
  const { RouteToHomeSite, jrEastRealTimeInfoCallback } = useViewSiteMain()

  return (
    <div className="relative z-10 p-6 flex justify-start items-center bg-gray-20 shadow-sm shadow-black">
      <div className="w-full mx-6">
        <Header
          text="NOZAWA OPENDATA PROJECT"
          icon="menu"
          size="large"
          variant="header-light"
          isCircle={true}
          onClick={RouteToHomeSite}
        />
      </div>
      <div className="flex items-center gap-4">
        <Button
          iconLeft="photo_camera"
          isShadow={true}
          onClick={() => {}}
          shape="circle"
          size="large"
          text=""
          variant="btn-light"
        />
        <Button
          iconLeft="autorenew"
          isShadow={true}
          onClick={jrEastRealTimeInfoCallback}
          shape="circle"
          size="large"
          text=""
          variant="btn-light"
        />
      </div>
    </div>
  )
}

export default HeaderApp
