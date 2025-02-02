"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const HeaderApp: React.FC = () => {
  const { routeToHomeSite } = useViewSiteMain()

  return (
    <div className="relative z-10 p-4 flex justify-start items-center bg-gray-20 shadow-sm shadow-black gap-4">
      <div className="w-full">
        <Header
          text="SPECTRA PROJECT"
          icon="home"
          size="large"
          variant="header-light"
          isCircle={true}
          onClick={routeToHomeSite}
        />
      </div>
    </div>
  )
}

export default HeaderApp
