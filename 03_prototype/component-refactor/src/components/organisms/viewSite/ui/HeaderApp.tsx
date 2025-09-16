"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import Button from "@/components/atoms/buttons/Button"
import SearchInput from "@/components/molecules/forms/SearchInput"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import LampCard from "@/components/molecules/frames/LampCard"
import AccountCard from "@/components/molecules/frames/AccountCard"
const HeaderApp: React.FC = () => {
  const { getModeColor, getModeText, getModeIcon, routeToHomeSite } = useViewSiteMain()

  return (
    <div className="relative items-center bg-back w-full">
      <div className="flex items-center justify-between shadow-black shadow-sm gap-2">
        <Header
          text="Relaha"
          icon="stat_minus_1"
          size="large"
          variant="header-dark"
          isCircle={false}
          onClick={routeToHomeSite}
        />
        <div className="w-[250px]">
          <AccountCard logoImg="" text="野澤遼太郎" infoButtonClick={() => {}} />
        </div>
      </div>

      <div className="flex items-center justify-between bg-back shadow-black shadow-sm pr-4">
        <div className="flex items-center gap-11">
          <div className="w-[350px]">
            <SearchInput
              placeholder="ユーザーを検索"
              size="large"
              shape="square"
              onChange={() => {}}
              onClick={() => {}}
              isStretch={true}
              isBlack={false}
            />
          </div>
          <LampCard
            text={`${getModeText()}`}
            variant={`${getModeColor()}`}
            icon={`${getModeIcon()}`}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button iconLeft="add" text="活動記録の新規作成" size="mini" variant="btn-primary" />
          <Button iconLeft="add" text="プロジェクトの新規作成" size="mini" variant="btn-success" />
        </div>
      </div>
    </div>
  )
}

export default HeaderApp
