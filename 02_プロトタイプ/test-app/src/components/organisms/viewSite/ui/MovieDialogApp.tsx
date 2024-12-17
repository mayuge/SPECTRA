"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Badge from "@/components/atoms/labels/Badge"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import Card from "@/components/molecules/frames/Card"

const MovieDialogApp: React.FC = () => {
  const { buttonClicked, jrEastRealTimeLocateDataCallback, tokyoMetroRealTimeDataCallback } =
    useViewSiteMain()

  return (
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
          <iframe
            width="400"
            height="225"
            src="https://www.youtube.com/embed/JZkaLakE4Nw?si=UB9h2A6fXkvxpEm6"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default MovieDialogApp
