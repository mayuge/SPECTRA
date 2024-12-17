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
  const { RouteToHomeSite } = useViewSiteMain()

  return (
    <div className="relative z-10 p-4 flex justify-center">
      <div className="max-w-screen-xl w-full mx-8">
        <Header
          text="NOZAWA OPENDATA PROJECT"
          icon="menu"
          size="large"
          variant="header-light"
          isCircle={true}
          onClick={RouteToHomeSite}
        />
      </div>
    </div>
  )
}

export default HeaderApp
