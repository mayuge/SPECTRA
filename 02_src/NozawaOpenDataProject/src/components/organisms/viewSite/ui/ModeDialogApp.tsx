"use client"
import React, { useState, useEffect } from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import TitleInfoCard from "@/components/molecules/frames/TitleInfoCard"
import LegendCard from "@/components/molecules/frames/LegendCard"

const ModeDialogApp: React.FC = () => {
  const { setModeDialogOpen, getModeDialogOpen, getSelectedModeText } = useViewSiteMain()

  const [selectedModeText, setSelectedModeText] = useState<string>("")

  // クライアントサイドでの同期
  useEffect(() => {
    if (getModeDialogOpen()) {
      setSelectedModeText(getSelectedModeText()!)
    }
  }, [getModeDialogOpen, getSelectedModeText])

  // ダイアログが閉じている場合は何も描画しない
  if (!getModeDialogOpen()) return null

  return (
    <div className="absolute top-[150px] right-0 p-4 z-10 ">
      <div className="relative md:w-[25vw] w-[60vw]">
        <DialogHeader
          text={`選択した交通手段：${selectedModeText}`}
          icon="close"
          variant="header-dark"
          size="normal"
          onClick={() => setModeDialogOpen(false)}
          isShadow={false}
        />
        <div className="h-[60vh] md:w-[25vw] w-[60vw] bg-white rounded-b-lg shadow-md shadow-black overflow-y-auto no-scrollbar">
          <TitleInfoCard
            text="バス運行密度（運行本数/町丁目面積）"
            logoImg="assets/logos/busLogo.webp"
            isShadow={false}
            shape="square"
          />
                {/* ["get", "KantoBusTripCountPerArea"],
      0,
      "#ffd5ea",
      100,
      "#ffaad5",
      2500,
      "#ff55aa",
      20000,
      "#aa0055", */}
          <LegendCard color="#ffd5ea" text="0 - 100" isShadow={false} />
          <LegendCard color="#ffaad5" text="100 - 2500" isShadow={false} />
          <LegendCard color="#ff55aa" text="2500 - 20000" isShadow={false} />
          <LegendCard color="#aa0055" text="20000 -" isShadow={false} />
          <TitleInfoCard
            text="シェアサイクル密度（駐輪台数/町丁目面積）"
            logoImg="assets/logos/bikeLogo.webp"
            isShadow={false}
            shape="square"
          />
                {/* ["get", "BycycleCapacityPerArea"],
      0,
      "#F7FBFF",
      20,
      "#C6DBEF",
      50,
      "#6BAED6",
      100,
      "#2171B5",
      300,
      "#08306B", */}
          <LegendCard color="#F7FBFF" text="0 - 20" isShadow={false} />
          <LegendCard color="#C6DBEF" text="20 - 50" isShadow={false} />
          <LegendCard color="#6BAED6" text="50 - 100" isShadow={false} />
          <LegendCard color="#2171B5" text="100 - 300" isShadow={false} />
          <LegendCard color="#08306B" text="300 -" isShadow={false} />
          <TitleInfoCard
            text="土地傾斜度（町丁目）"
            logoImg="assets/logos/mountain.webp"
            isShadow={false}
            shape="square"
          />
                {/* "interpolate",
      ["linear"],
      ["get", "AverageSlopeAngleRound"],
      2,
      "#FFAA00",
      5,
      "#734C00",
    ], */}
          <LegendCard color="#FFFFFF" text="0.00 - 2.00" isShadow={false} />
          <LegendCard color="#FFAA00" text="2.00 - 5.00" isShadow={false} />
          <LegendCard color="#734C00" text="5.00 -" isShadow={false} />
        </div>
      </div>
    </div>
  )
}

export default ModeDialogApp
