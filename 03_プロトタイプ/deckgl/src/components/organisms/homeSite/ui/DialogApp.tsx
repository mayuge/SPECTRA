"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import PullTab from "@/components/atoms/buttons/PullTab"
import Badge from "@/components/atoms/labels/Badge"
import Button from "@/components/atoms/buttons/Button"

import { useDialogStateAdapter } from "@/infrastructure/adapters/storeAdapters"

const DialogApp: React.FC = () => {
  const { getMainPanelOpen, setMainPanelOpen } = useDialogStateAdapter()

  if (!getMainPanelOpen()) {
    return (
      <div className="w-[100svw] flex justify-center">
        <PullTab
          position="bottom"
          size="mini"
          variant="pullTab-light"
          icon="arrow_drop_up"
          isShadow={true}
          onClick={() => {
            setMainPanelOpen(true)
          }}
        />
      </div>
    )
  }
  return (
    <div className="w-[100svw] max-w-screen-xl">
      <DialogHeader
        text="操作用ダイアログ"
        icon="close"
        size="normal"
        variant="header-dark"
        //shape="square"
        onClick={() => {
          setMainPanelOpen(false)
        }}
      />
      <div className="max-w-screen-xl w-full mx-auto h-[60vh] p-4 bg-white shadow-black shadow-lg">
        <div className="flex items-center gap-2">
          <Badge variant="badge-primary" shape="circle" text="デフォルトプリセット" />
          <Badge variant="badge-secondary" shape="circle" text="都市計画プリセット" />
          <Badge variant="badge-secondary" shape="circle" text="鉄道路線プリセット" />
          <Badge variant="badge-secondary" shape="circle" text="不動産探しプリセット" />
          <Badge variant="badge-secondary" shape="circle" text="3Dレイヤープリセット" />
        </div>
      </div>
    </div>
  )
}

export default DialogApp
