"use client"
import React, { useState } from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import Button from "@/components/atoms/buttons/Button"
import Textarea from "@/components/atoms/inputs/Textarea"
import useDialogApp from "@/components/organisms/homeSite/core/application/useDialogApp"

const DialogApp: React.FC = () => {
  const { manageChatMessage, getMainPanelOpen, setMainPanelOpen } = useDialogApp()
  const [chatInput, setChatInput] = useState("")

  const chatInputOnChange = (value: string) => {
    setChatInput(value)
  }

  const chatButtonClicked = () => {
    // 必要ならここで API 呼び出し
    manageChatMessage(chatInput)
    setChatInput("")
  }

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
            <Textarea
              rows={2}
              value={chatInput}
              onChange={(e) => chatInputOnChange(e.target.value)}
            />
            <Button
              size="large"
              variant="btn-primary"
              shape="circle"
              iconLeft="send"
              onClick={chatButtonClicked}
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
      <div className="max-w-screen-lg w-full mx-auto overflow-y-auto no-scrollbar h-[60vh] p-4 bg-white shadow-black shadow-lg z-50 animate-slide-up"></div>
    </div>
  )
}

export default DialogApp
