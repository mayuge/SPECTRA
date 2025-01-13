"use client";
import React, { useState, useEffect } from "react";
import DialogHeader from "@/components/molecules/header/DialogHeader";
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain";
import TitleInfoCard from "@/components/molecules/frames/TitleInfoCard";

const ModeDialogApp: React.FC = () => {
  const {
    setModeDialogOpen,
    getModeDialogOpen,
    getSelectedModeText,
  } = useViewSiteMain();

  const [selectedModeText, setSelectedModeText] = useState<string>("");

  // クライアントサイドでの同期
  useEffect(() => {
    if (getModeDialogOpen()) {
      setSelectedModeText(getSelectedModeText()!);
    }
  }, [getModeDialogOpen, getSelectedModeText]);

  // ダイアログが閉じている場合は何も描画しない
  if (!getModeDialogOpen()) return null;

  return (
    <div className="absolute top-[150px] right-0 p-4 z-10 ">
      <div className="relative md:w-[25vw] w-[50vw]">
        <DialogHeader
          text={`選択した交通手段：${selectedModeText}`}
          icon="close"
          variant="header-dark"
          size="normal"
          onClick={() => setModeDialogOpen(false)}
          isShadow={false}
        />
        <div className="h-[40vh] md:w-[25vw] w-[50vw] bg-white rounded-b-lg shadow-md shadow-black overflow-y-auto no-scrollbar">
          <TitleInfoCard
            text="バス運行密度（運行本数/町丁目面積）"
            logoImg="assets/logos/busLogo.webp"
            isShadow={false}
            shape="square"
          />
          <TitleInfoCard
            text="シェアサイクル密度（駐輪台数/町丁目面積）"
            logoImg="assets/logos/bikeLogo.webp"
            isShadow={false}
            shape="square"
          />
          <TitleInfoCard
            text="土地傾斜度（町丁目）"
            logoImg="assets/logos/mountain.webp"
            isShadow={false}
            shape="square"
          />
        </div>
      </div>
    </div>
  );
};

export default ModeDialogApp;
