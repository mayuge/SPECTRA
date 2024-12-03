"use client"

import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Header from "@/components/molecules/header/Header"
import useMenuSiteMain from "@/components/organisms/menuSite/core/application/useMenuSiteMain"

const MenuSiteMain: React.FC = () => {
  const { buttonClicked, navigateToHomeSite, getCount } = useMenuSiteMain()

  return (
    <div className="relative">
    <img
      src="/assets/platou_test2.jpeg"
      className="absolute inset-0 w-full h-full object-cover z-[-1]"
    />
    
    <div className="relative z-10 p-4 flex justify-center">
      <div className="max-w-screen-xl w-full mx-auto mx-8">
        <Header
          text="NOZAWA OPENDATA PROJECT"
          icon="menu"
          size="large"
          variant="header-light"
          isCircle={true}
          onClick={buttonClicked}
        />
      </div>
    </div>
  
    <div className="m-4">
      <div>
        <TextLabel
          text={`状態管理ツールテスト用カウンター:${getCount()}`}
          size="normal"
          bold={false}
        />
      </div>
      <div className="flex justify-center my-8">
        <Button
          text="ホームページに遷移する"
          iconRight="arrow_forward"
          variant="btn-dark"
          size="normal"
          shape="circle"
          onClick={navigateToHomeSite}
        />
      </div>
    </div>
  </div>
  
  )
}

export default MenuSiteMain
