"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import Button from "@/components/atoms/buttons/Button"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const HeaderApp: React.FC = () => {
  const { routeToHomeSite, openAllDialogs } = useViewSiteMain()

  return (
    <div className="relative z-10 p-4 flex justify-start items-center bg-gray-20 shadow-sm shadow-black gap-4">
      <div className="w-full">
        <Header
          text="SPECTRA PROJECT"
          icon="menu"
          size="large"
          variant="header-light"
          isCircle={true}
          onClick={routeToHomeSite}
        />
      </div>
      <div className="flex items-center">
        <Button
          iconLeft="commute"
          isShadow={true}
          onClick={openAllDialogs}
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
