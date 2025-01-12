"use client"
import React, { useEffect } from "react"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import Card from "@/components/molecules/frames/Card"
import PullTab from "@/components/atoms/buttons/PullTab"

const LayerListBarApp: React.FC = () => {
  const {
    setLayerBarOpen,
    getLayerBarOpen,
    openAllDialogs,
    buttonClicked,
    getCardList,
    changeLayerOrder,
    getIsDisplayLayer,
    setIsDisplayLayer,
    setOpacity,
  } = useViewSiteMain()

  // 関数マッピング
  const functionMap: { [key: string]: (() => void) | undefined } = {
    buttonClicked,
    openAllDialogs,
  }

  // cardList にコールバック関数を設定
  const displayCardList= () => getCardList().map((card, index) => ({
    ...card,
    isDisplayLayer: getIsDisplayLayer(index),
    sliderClick: (value: number) => setOpacity(index, value), // スライダー変更時のハンドラー
    infoButtonClick: functionMap[card.infoButtonClick] || (() => {}),
    displayButtonClick: () => setIsDisplayLayer(index),
    orderButtonClick: () => changeLayerOrder(index),
  }))

  if (!getLayerBarOpen()) {
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
    )
  }

  return (
    <div className="relative z-10 flex items-center max-w-md">
      <div className="h-calc-100vh-120px bg-white shadow-lg shadow-black overflow-y-auto no-scrollbar">
        {displayCardList().map((card, index) => (
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
