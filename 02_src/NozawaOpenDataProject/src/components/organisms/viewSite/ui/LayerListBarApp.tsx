"use client"
import React from "react"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import Card from "@/components/molecules/frames/Card"
import PullTab from "@/components/atoms/buttons/PullTab"

const LayerListBarApp: React.FC = () => {
  const {
    setLayerBarOpen,
    getLayerBarOpen,
    openAllDialogs,
    buttonClicked,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeInfoCallback,
    getCardList,
    changeLayerOrder,
    getIsDisplayLayer,
    setIsDisplayLayer,
  } = useViewSiteMain()

  // 関数マッピング
  const functionMap: { [key: string]: () => void } = {
    buttonClicked,
    openAllDialogs,
    jrEastRealTimeLocateDataCallback,
    tokyoMetroRealTimeInfoCallback,
  }

  // cardList にコールバック関数を設定
  const displayCardList = getCardList().map((card, index) => ({
    ...card,
    isDisplayLayer: getIsDisplayLayer(index),
    colorPickerClick: functionMap[card.colorPickerClick],
    sliderClick: functionMap[card.sliderClick],
    infoButtonClick: functionMap[card.infoButtonClick],
    displayButtonClick: () => setIsDisplayLayer(index),
    orderButtonClick: () => changeLayerOrder(index),
  }))

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
      <div className="h-calc-100vh-120px bg-white shadow-lg shadow-black overflow-y-auto no-scrollbar">
        {displayCardList.map((card, index) => (
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
