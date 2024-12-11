"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import MapApp from "@/components/organisms/viewSite/ui/MapApp"
import Card from "@/components/molecules/frames/Card"
import LayerListApp from "./LayerListApp"

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
      {/* ヘッダーを表示 */}
      <div className="relative z-10 p-4 flex justify-center">
        <div className="max-w-screen-xl w-full mx-8">
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
      <LayerListApp/>
      <div className="absolute top-[100px] right-0 p-4 z-10 ">
        <div className="relative max-w-md">
          <DialogHeader
            text="詳細説明ダイアログ"
            icon="close"
            variant="header-dark"
            size="normal"
            onClick={buttonClicked}
            isShadow={false}
          />
          <div className="max-h-[200px] max-w-[400px] min-h-[150px] min-w-[150px] bg-white rounded-b-lg shadow-md shadow-black">
            {/* サンプルテキストを追加 */}
            <p className="p-4 text-black">ここに内容を追加してください。ここにレイヤーの色やプロパティを調整できるものをおいてもいいかも</p>
          </div>
        </div>
      </div>
      <div className="absolute top-[400px] right-0 p-4 z-10 ">
        <div className="relative max-w-md">
          <DialogHeader
            text="動画リンクダイアログ"
            icon="close"
            variant="header-dark"
            size="normal"
            onClick={buttonClicked}
            isShadow={false}
          />
          <div className="max-h-[225px] max-w-[400px] min-h-[150px] min-w-[150px] bg-white rounded-b-lg shadow-md shadow-black">
          <iframe width="400" height="225" src="https://www.youtube.com/embed/JZkaLakE4Nw?si=UB9h2A6fXkvxpEm6" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewSiteMain
