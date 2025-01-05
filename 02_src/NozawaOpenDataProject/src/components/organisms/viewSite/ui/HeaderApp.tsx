"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import Button from "@/components/atoms/buttons/Button"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const HeaderApp: React.FC = () => {
  const { routeToHomeSite, useCallback } = useViewSiteMain()

  return (
    <div className="relative z-10 pr-6 py-6 flex justify-start items-center bg-gray-20 shadow-sm shadow-black">
      <div className="w-full mx-6">
        <Header
          text="SPECTRA PROJECT"
          icon="menu"
          size="large"
          variant="header-light"
          isCircle={true}
          onClick={routeToHomeSite}
        />
      </div>
      <div className="flex items-center gap-4">
        <Button
          iconLeft="photo_camera"
          isShadow={true}
          onClick={useCallback}
          shape="circle"
          size="large"
          text=""
          variant="btn-light"
        />
        <Button
          iconLeft="autorenew"
          isShadow={true}
          onClick={useCallback}
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
