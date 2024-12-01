"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import useHomeSiteMain from "@/components/organisms/homeSite/core/application/useHomeSiteMain"

const HomeSiteMain: React.FC = () => {
  const { buttonClicked, navigateToMenuSite, jrEastRealTimeLocateDataCallback } = useHomeSiteMain()
  return (
    <div>
      <Header
        text="API取得テストホームページ　"
        icon="menu"
        size="normal"
        variant="header-primary"
        onClick={buttonClicked}
      />
      <div className="m-4">
        <div className="flex justify-center items-center gap-4">
          <TextLabel text="JR東日本リアルタイム車両位置データ" size="normal" bold={false} />
          <Button
            text="更新する"
            icon="refresh"
            variant="btn-primary"
            size="small"
            onClick={jrEastRealTimeLocateDataCallback}
          />
        </div>
        <div className="flex justify-center my-4">
          {/* メニューページに遷移するボタン */}
          <Button
            text="メニューページに遷移する"
            variant="btn-warning"
            size="normal"
            shape="circle"
            onClick={navigateToMenuSite}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeSiteMain
