"use client"
import React from "react"
import Header from "@/components/molecules/header/Header"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
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
      {/* ヘッダーを表示 */}
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

      <div className="relative z-10 bg-white p-2 m-4 rounded-lg shadow-lg max-w-md shadow-md shadow-black">
        <Card
          text="JR東日本リアルタイム車両位置データ"
          dangerBadge="交通データ"
          warningBadge="鉄道"
          successBadge="リアルタイム"
          primaryBadge="ポイントデータ"
          darkBadge="2024オープンデータチャレンジ限定"
          isShadow={false}
          shape="square"
          isDisplayLayer={true}
          refreshButtonClick={jrEastRealTimeLocateDataCallback}
          displayButtonClick={buttonClicked}
        />
        <Card
          text="東京メトロリアルタイム運行状況データ"
          dangerBadge="交通データ"
          warningBadge="鉄道"
          successBadge="リアルタイム"
          primaryBadge="ラインデータ"
          isShadow={false}
          shape="square"
          isDisplayLayer={false}
          refreshButtonClick={tokyoMetroRealTimeDataCallback}
          displayButtonClick={buttonClicked}
        />
         <Card
          text="2020年度国勢調査メッシュ"
          dangerBadge="人口データ"
          warningBadge="国勢調査"
          primaryBadge="メッシュデータ"
          isShadow={false}
          shape="square"
          isDisplayLayer={false}
          refreshButtonClick={tokyoMetroRealTimeDataCallback}
          displayButtonClick={buttonClicked}
        />
        <Card
          text="2020年度国勢調査メッシュ"
          dangerBadge="人口データ"
          warningBadge="国勢調査"
          primaryBadge="メッシュデータ"
          isShadow={false}
          shape="square"
          isDisplayLayer={false}
          refreshButtonClick={tokyoMetroRealTimeDataCallback}
          displayButtonClick={buttonClicked}
        />
        <Card
          text="2020年度国勢調査メッシュ"
          dangerBadge="人口データ"
          warningBadge="国勢調査"
          primaryBadge="メッシュデータ"
          isShadow={false}
          shape="square"
          isDisplayLayer={false}
          refreshButtonClick={tokyoMetroRealTimeDataCallback}
          displayButtonClick={buttonClicked}
        />
        <Card
          text="2020年度国勢調査メッシュ"
          dangerBadge="人口データ"
          warningBadge="国勢調査"
          primaryBadge="メッシュデータ"
          isShadow={false}
          shape="square"
          isDisplayLayer={false}
          refreshButtonClick={tokyoMetroRealTimeDataCallback}
          displayButtonClick={buttonClicked}
        />
        <Card
          text="2020年度国勢調査メッシュ"
          dangerBadge="人口データ"
          warningBadge="国勢調査"
          primaryBadge="メッシュデータ"
          isShadow={false}
          shape="square"
          isDisplayLayer={false}
          refreshButtonClick={tokyoMetroRealTimeDataCallback}
          displayButtonClick={buttonClicked}
        />
        <Card
          text="2020年度国勢調査メッシュ"
          dangerBadge="人口データ"
          warningBadge="国勢調査"
          primaryBadge="メッシュデータ"
          isShadow={false}
          shape="square"
          isDisplayLayer={false}
          refreshButtonClick={tokyoMetroRealTimeDataCallback}
          displayButtonClick={buttonClicked}
        />
        <Card
          text="2020年度国勢調査メッシュ"
          dangerBadge="人口データ"
          warningBadge="国勢調査"
          primaryBadge="メッシュデータ"
          isShadow={false}
          shape="square"
          isDisplayLayer={false}
          refreshButtonClick={tokyoMetroRealTimeDataCallback}
          displayButtonClick={buttonClicked}
        />
        
      </div>
    </div>
  )
}

export default ViewSiteMain
