"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import Card from "@/components/molecules/frames/Card"
import PullTab from "@/components/atoms/buttons/PullTab"

const LayerListBarApp: React.FC = () => {
  const { buttonClicked, jrEastRealTimeLocateDataCallback, tokyoMetroRealTimeDataCallback } =
    useViewSiteMain()

  return (
    <div className="relative z-10 flex items-center max-w-md">
<div className="relative z-10 max-w-md max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar shadow-lg shadow-black">
      <div className="relative z-10 bg-white p-2 max-w-md ">
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
    <PullTab position="left" size="mini" variant="pullTab-light" icon="arrow_left"/>
    </div>
    
  )
}

export default LayerListBarApp
