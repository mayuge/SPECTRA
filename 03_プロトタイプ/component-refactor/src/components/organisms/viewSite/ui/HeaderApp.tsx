"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import SearchInput from "@/components/molecules/forms/SearchInput"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import LampCard from "@/components/molecules/frames/LampCard"
const HeaderApp: React.FC = () => {
  const { routeToHomeSite } = useViewSiteMain()
  return (
    <div className="relative items-center bg-back w-full">
      <Header
        text="Relaha"
        icon="menu"
        size="large"
        variant="header-dark"
        isCircle={false}
        onClick={routeToHomeSite}
      />
      <div className="flex items-center shadow-black shadow-sm gap-11">
        <div className="w-[360px]">
          <SearchInput
            placeholder="ユーザーを検索"
            size="normal"
            shape="square"
            onChange={() => {}}
            onClick={() => {}}
            isStretch={true}
            isBlack={false}
          />
        </div>
        <LampCard text={`テスト`} variant="success" icon="person" />
      </div>
    </div>
  )
}

export default HeaderApp
