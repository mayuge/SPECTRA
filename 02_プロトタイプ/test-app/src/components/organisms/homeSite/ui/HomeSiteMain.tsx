"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import MapApp from "@/components/organisms/homeSite/ui/MapApp"
import useHomeSiteMain from "@/components/organisms/homeSite/core/application/useHomeSiteMain"

const HomeSiteMain: React.FC = () => {
  const {
    buttonClicked,
    navigateToMenuSite,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeDataCallback,
    increment,
    decrement,
    getCount,
  } = useHomeSiteMain()
  return (
    <div>
      <Header
        text="API取得テストホームページ　"
        icon="menu"
        size="normal"
        variant="header-primary"
        onClick={buttonClicked}
      />
      <div className="flex justify-center">
        <div>
        <div className="flex items-center gap-4 my-4">
          <Badge text="GETリクエスト" variant="badge-warning"/>
          <Badge text="JSON" variant="badge-danger"/>
          <TextLabel text="JR東日本リアルタイム車両位置データ" size="normal" bold={false} />
          <Button
            text="更新する"
            icon="refresh"
            variant="btn-primary"
            size="small"
            onClick={jrEastRealTimeLocateDataCallback}
          />
        </div>
        <div className="flex  items-center gap-4 my-4">
        <Badge text="GETリクエスト" variant="badge-warning"/>
        <Badge text="JSON" variant="badge-danger"/>
          <TextLabel text="東京メトロリアルタイム運行状況データ" size="normal" bold={false} />
          <Button
            text="更新する"
            icon="refresh"
            variant="btn-primary"
            size="small"
            onClick={tokyoMetroRealTimeDataCallback}
          />
        </div>
        <div className="flex  gap-4">
          <TextLabel
            text={`状態管理ツールテスト用カウンター:${getCount()}`}
            size="normal"
            bold={false}
          />
          <Button
            icon="remove"
            variant="btn-danger"
            size="small"
            shape="circle"
            onClick={decrement}
          />
          <Button
            icon="add"
            variant="btn-success"
            size="small"
            shape="circle"
            onClick={increment}
          />
        </div>
        <div className="flex justify-center my-4">
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
      <div className="w-full my-4">
        <MapApp/>
      </div>
    </div>
  )
}

export default HomeSiteMain
