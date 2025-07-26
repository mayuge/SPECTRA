"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import Badge from "@/components/atoms/labels/Badge"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import GridLogoButton from "@/components/atoms/buttons/GridLogoButton"
import Card from "@/components/molecules/frames/Card"
import Textarea from "@/components/atoms/inputs/Textarea"

import { useDialogStateAdapter } from "@/infrastructure/adapters/storeAdapters"

const DialogApp: React.FC = () => {
  const { getMainPanelOpen, setMainPanelOpen } = useDialogStateAdapter()

  if (!getMainPanelOpen()) {
    return (
      <div className="w-[100svw] max-w-screen-lg z-50">
        <DialogHeader
          text="チャットで質問"
          icon="arrow_drop_up"
          isPullIcon={true}
          size="normal"
          variant="header-dark"
          //shape="square"
          onClick={() => {
            setMainPanelOpen(true)
          }}
        />
        <div className="p-4 bg-white shadow-black shadow-lg">
          <div className="flex gap-4">
            <Textarea rows={2} value="" onChange={() => {}} />
            <Button
              size="large"
              variant="btn-primary"
              shape="circle"
              iconLeft="send"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="w-[100svw] max-w-screen-lg z-50 animate-slide-up">
      <DialogHeader
        text="操作用ダイアログ"
        icon="arrow_drop_down"
        size="normal"
        variant="header-dark"
        isShadow={true}
        isPullIcon={true}
        //shape="square"
        onClick={() => {
          setMainPanelOpen(false)
        }}
      />
      <div className="max-w-screen-lg w-full mx-auto overflow-y-auto no-scrollbar h-[60vh] p-4 bg-white shadow-black shadow-lg z-50 animate-slide-up">
        <div className="pb-2 flex items-center">
          <Button size="mini" variant="btn-text-gray" iconLeft="filter_alt" />
          <TextLabel text="プリセットの選択" size="normal" isBlack={true} bold={false} />
        </div>

        <div className="pt-4">
          <hr className="border-gray-70" />
        </div>
        <div className="py-2 flex items-center">
          <Button size="mini" variant="btn-text-gray" iconLeft="edit" />
          <TextLabel
            text="選択されたレイヤーの詳細設定"
            size="normal"
            isBlack={true}
            bold={false}
          />
        </div>
      </div>
    </div>
  )
}

export default DialogApp
