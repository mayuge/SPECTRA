"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import useHomeSiteMain from "@/components/organisms/homeSite/core/application/useHomeSiteMain"
import CheckBox from "@/components/atoms/Inputs/CheckBox"
import Map from "@/components/atoms/map/Map"

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
    <div className="relative w-full h-screen">
      {/* 地図を全画面に表示 */}
      <div className="absolute inset-0 z-0">
        <Map />
      </div>

      <div className="relative z-10 p-4 flex justify-center">
        <div className="max-w-screen-xl w-full mx-auto mx-8">
        <Header
          text="API取得テストホームページ"
          icon="menu"
          size="large"
          variant="header-primary"
          isCircle={true}
          onClick={buttonClicked}
        />
        </div>
      
      </div>
      {/* コンテンツを地図の上に表示 */}
      <div className="relative z-10 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">


        <div className="flex justify-center">
          <div>
            <div className="flex items-center gap-4 my-4">
              <CheckBox value={true} onChange={buttonClicked} />
              <Badge text="GETリクエスト" variant="badge-warning" />
              <Badge text="JSON" variant="badge-danger" />
              <TextLabel text="JR東日本リアルタイム車両位置データ" size="normal" bold={false} />
              <Button
                text="更新する"
                icon="refresh"
                variant="btn-primary"
                size="small"
                onClick={jrEastRealTimeLocateDataCallback}
              />
            </div>
            <div className="flex items-center gap-4 my-4">
              <Badge text="GETリクエスト" variant="badge-warning" />
              <Badge text="JSON" variant="badge-danger" />
              <TextLabel text="東京メトロリアルタイム運行状況データ" size="normal" bold={false} />
              <Button
                text="更新する"
                icon="refresh"
                variant="btn-primary"
                size="small"
                onClick={tokyoMetroRealTimeDataCallback}
              />
            </div>
            <div className="flex gap-4">
              <TextLabel
                text={`状態管理ツールテスト用カウンター: ${getCount()}`}
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
      </div>
    </div>
  )
}

export default HomeSiteMain
