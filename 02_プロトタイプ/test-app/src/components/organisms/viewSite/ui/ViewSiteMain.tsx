"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import CheckBox from "@/components/atoms/Inputs/CheckBox"
import MapApp from "@/components/organisms/viewSite/ui/MapApp"
import Card from "@/components/molecules/frames/Card"

const ViewSiteMain: React.FC = () => {
  const {
    buttonClicked,
    RouteToHomeSite,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeDataCallback,
    increment,
    decrement,
    getCount,
  } = useViewSiteMain()

  return (
    <div className="relative w-full h-screen">
      {/* 地図を全画面に表示 */}
      <div className="absolute inset-0 z-0">
        <MapApp />
      </div>

      <div className="relative z-10 p-4 flex justify-center">
        <div className="max-w-screen-xl w-full mx-auto mx-8">
          <Header
            text="NOZAWA OPENDATA PROJECT"
            icon="menu"
            size="large"
            variant="header-light"
            isCircle={true}
            onClick={RouteToHomeSite}
          />
        </div>
      </div>

      {/* コンテンツを地図の上に表示 */}
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex justify-center">
          <div>
            <Card text="JR東日本リアルタイム車両位置データ" isShadow={true} shape="square" />
            <div className="flex items-center gap-4 my-4">
              <CheckBox value={true} onChange={buttonClicked} />
              <Button
                iconLeft="visibility"
                variant="btn-text-gray"
                size="mini"
                onClick={buttonClicked}
              />
              <Badge text="GETリクエスト" variant="badge-warning" />
              <Badge text="JSON" variant="badge-danger" />
              <TextLabel text="JR東日本リアルタイム車両位置データ" size="normal" bold={false} />
              <Button
                text="更新する"
                iconLeft="refresh"
                variant="btn-primary"
                size="small"
                onClick={jrEastRealTimeLocateDataCallback}
              />
              <Button
                iconLeft="check"
                iconRight=""
                onClick={() => {}}
                shape="circle"
                size="normal"
                text=""
                variant="btn-primary"
              />
            </div>
            <div className="flex items-center gap-4 my-4">
              <Button
                iconLeft="visibility_off"
                variant="btn-text-gray"
                size="mini"
                onClick={buttonClicked}
              />
              <Badge text="GETリクエスト" variant="badge-warning" />
              <Badge text="JSON" variant="badge-danger" />
              <TextLabel text="東京メトロリアルタイム運行状況データ" size="normal" bold={false} />
              <Button
                text="更新する"
                iconLeft="refresh"
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
                iconLeft="remove"
                variant="btn-danger"
                size="small"
                shape="circle"
                onClick={decrement}
              />
              <Button
                iconLeft="add"
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
                onClick={RouteToHomeSite}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewSiteMain
