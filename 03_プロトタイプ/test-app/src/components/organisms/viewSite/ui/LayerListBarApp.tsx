"use client"
import React from "react"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import Card from "@/components/molecules/frames/Card"
import PullTab from "@/components/atoms/buttons/PullTab"

const LayerListBarApp: React.FC = () => {
  const {
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeInfoCallback,
    setLayerBarOpen,
    getLayerBarOpen,
    openAllDialogs,
    buttonClicked,
  } = useViewSiteMain()
  const cardData = [
    {
      logoImg: "/assets/logos/jreast.webp",
      text: "JR東日本リアルタイム車両位置データ",
      dangerBadge: "交通データ",
      warningBadge: "鉄道",
      successBadge: "リアルタイム",
      primaryBadge: "ポイントデータ",
      darkBadge: "2024オープンデータチャレンジ限定",
      isShadow: false,
      shape: "square",
      isDisplayLayer: true,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: jrEastRealTimeLocateDataCallback,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/tokyometro.webp",
      text: "東京メトロリアルタイム運行状況データ",
      dangerBadge: "交通データ",
      warningBadge: "鉄道",
      successBadge: "リアルタイム",
      primaryBadge: "ラインデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/soumusyou.webp",
      text: "2020年度国勢調査メッシュ",
      dangerBadge: "人口データ",
      warningBadge: "国勢調査",
      primaryBadge: "メッシュデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/soumusyou.webp",
      text: "2020年度国勢調査メッシュ",
      dangerBadge: "人口データ",
      warningBadge: "国勢調査",
      primaryBadge: "メッシュデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/soumusyou.webp",
      text: "2020年度国勢調査メッシュ",
      dangerBadge: "人口データ",
      warningBadge: "国勢調査",
      primaryBadge: "メッシュデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/soumusyou.webp",
      text: "2020年度国勢調査メッシュ",
      dangerBadge: "人口データ",
      warningBadge: "国勢調査",
      primaryBadge: "メッシュデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/soumusyou.webp",
      text: "2020年度国勢調査メッシュ",
      dangerBadge: "人口データ",
      warningBadge: "国勢調査",
      primaryBadge: "メッシュデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/soumusyou.webp",
      text: "2020年度国勢調査メッシュ",
      dangerBadge: "人口データ",
      warningBadge: "国勢調査",
      primaryBadge: "メッシュデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/soumusyou.webp",
      text: "2020年度国勢調査メッシュ",
      dangerBadge: "人口データ",
      warningBadge: "国勢調査",
      primaryBadge: "メッシュデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/soumusyou.webp",
      text: "2020年度国勢調査メッシュ",
      dangerBadge: "人口データ",
      warningBadge: "国勢調査",
      primaryBadge: "メッシュデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
    {
      logoImg: "/assets/logos/soumusyou.webp",
      text: "2020年度国勢調査メッシュ",
      dangerBadge: "人口データ",
      warningBadge: "国勢調査",
      primaryBadge: "メッシュデータ",
      isShadow: false,
      shape: "square",
      isDisplayLayer: false,
      colorPickerClick: buttonClicked,
      sliderClick: buttonClicked,
      infoButtonClick: openAllDialogs,
      displayButtonClick: buttonClicked,
      orderButtonClick: buttonClicked,
    },
  ]

  if (!getLayerBarOpen())
    return (
      <div className="relative z-10 w-min h-calc-100vh-120px overflow-y-auto no-scrollbar flex items-center">
        <PullTab
          position="left"
          size="mini"
          variant="pullTab-light"
          icon="arrow_right"
          isShadow={true}
          onClick={() => {
            setLayerBarOpen(true)
          }}
        />
      </div>
    ) // 完全に非表示になった後にDOMを削除

  return (
    <div className="relative z-10 flex items-center max-w-md">
      <div className="h-calc-100vh-120px bg-white p-2  shadow-lg shadow-black overflow-y-auto no-scrollbar">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <PullTab
        position="left"
        size="mini"
        variant="pullTab-light"
        icon="arrow_left"
        isShadow={true}
        onClick={() => {
          setLayerBarOpen(false)
        }}
      />
    </div>
  )
}

export default LayerListBarApp
