"use client";
import React, { useState, useEffect } from "react";
import DialogHeader from "@/components/molecules/header/DialogHeader";
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain";

const MovieDialogApp: React.FC = () => {
  const { setMovieDialogOpen, getMovieDialogOpen } = useViewSiteMain();
  const [isVisible, setIsVisible] = useState(true); // 初期値を true に設定

  // クライアント側でのみ動作するように設定
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsVisible(getMovieDialogOpen()); // Zustand の状態を初期設定に反映
    }
  }, [getMovieDialogOpen]);

  // ダイアログを閉じるロジック
  const handleClose = () => {
    setIsVisible(false); // ダイアログを非表示に
    setMovieDialogOpen(false); // 状態を変更
  };

  if (!isVisible) return null; // 完全に非表示になった後にDOMを削除

  return (
    <div className="absolute top-[400px] right-0 p-4 z-10">
      <div className="relative max-w-md">
        <DialogHeader
          text="関連動画"
          icon="close"
          variant="header-dark"
          size="normal"
          onClick={handleClose} // 閉じる処理
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
  );
};

export default MovieDialogApp;
