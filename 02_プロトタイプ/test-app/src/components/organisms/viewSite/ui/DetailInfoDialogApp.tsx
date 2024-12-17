"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import Card from "@/components/molecules/frames/Card"

const DetailInfoDialogApp: React.FC = () => {
  const { buttonClicked, jrEastRealTimeLocateDataCallback, tokyoMetroRealTimeDataCallback } =
    useViewSiteMain()

  return (
    <div className="absolute top-[150px] right-0 p-4 z-10 ">
      <div className="relative max-w-md">
        <DialogHeader
          text="詳細情報"
          icon="close"
          variant="header-dark"
          size="normal"
          onClick={buttonClicked}
          isShadow={false}
        />
        <div className="max-h-[200px] max-w-[400px] min-h-[150px] min-w-[150px] bg-white rounded-b-lg shadow-md shadow-black">
          {/* サンプルテキストを追加 */}
          <p className="p-4 text-black">
            ここに内容を追加してください。ここにレイヤーの色やプロパティを調整できるものをおいてもいいかも
          </p>
        </div>
      </div>
    </div>
  )
}

export default DetailInfoDialogApp
