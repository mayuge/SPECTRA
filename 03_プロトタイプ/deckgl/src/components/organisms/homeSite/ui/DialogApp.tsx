"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import PullTab from "@/components/atoms/buttons/PullTab"
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
    <div className="w-[100svw]">
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
      <div className="w-full h-[300px] bg-white shadow-black shadow-lg"></div>
    </div>
  )
}

export default DialogApp
