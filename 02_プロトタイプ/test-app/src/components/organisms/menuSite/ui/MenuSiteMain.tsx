"use client"

import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Header from "@/components/molecules/header/Header"
import useMenuSiteMain from "@/components/organisms/menuSite/core/application/useMenuSiteMain"

const MenuSiteMain: React.FC = () => {
  const { buttonClicked, navigateToHomeSite } = useMenuSiteMain()

  return (
    <div>
      <Header
        text="遷移後メニュー"
        icon="menu"
        size="normal"
        variant="header-primary"
        onClick={buttonClicked}
      />
      <div className="m-4">
        <div className="flex justify-center">
          <TextLabel text="状態管理ツールのテスト" size="normal" bold={false}/>
        </div>
        <div className="flex justify-center my-8">
          <Button
            text="ホームページに遷移する"
            variant="btn-warning"
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
