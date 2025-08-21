"use client"
import React, { useState } from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import Button from "@/components/atoms/buttons/Button"
import Textarea from "@/components/atoms/inputs/Textarea"
import PullTab from "@/components/atoms/buttons/PullTab"
import useDialogApp from "@/components/organisms/homeSite/core/application/useDialogApp"

const DialogApp: React.FC = () => {
  const { manageChatMessage, getMainPanelOpen, setMainPanelOpen, getChatMessageList } =
    useDialogApp()
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
      <div>
        {/* PC用 PullTab */}
        <div className="hidden md:block absolute z-[10] left-0">
          <div className="relative w-min h-[100svh] overflow-y-auto no-scrollbar flex items-center">
            <PullTab
              position="left"
              size="mini"
              variant="pullTab-dark"
              icon="arrow_right"
              isShadow={true}
              onClick={() => {
                setMainPanelOpen(true)
              }}
            />
          </div>
        </div>

        <div className="md:hidden fixed bottom-0 left-0 w-full rounded-t-lg bg-white shadow-black shadow-lg flex flex-col z-20">
          {/* タイトルバー（閉じてても出す） */}
          <DialogHeader
            icon="arrow_drop_up"
            isPullIcon={true}
            text="SPECTRA CHAT"
            size="large"
            variant="header-dark"
            onClick={() => {
              setMainPanelOpen(true) // タップで開く
            }}
          />

          {/* 入力欄 */}
          <div className="shadow-black shadow-sm flex p-4 gap-4 border-t border-gray-200 bg-gray-90">
            <Textarea
              rows={2}
              value={chatInput}
              onChange={(e) => chatInputOnChange(e.target.value)}
              className="flex-1"
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
    <div className="absolute z-[10] left-0 bottom-0 max-w-full md:max-w-md w-full">
      <div className="flex items-center">
        <div className="w-full">
          <div className="md:hidden sticky top-0 z-20">
            <DialogHeader
              icon="arrow_drop_down"
              isPullIcon={true}
              text="SPECTRA CHAT"
              size="large"
              variant="header-dark"
              onClick={() => {
                setMainPanelOpen(false)
              }}
            />
          </div>
          <div className="bg-white h-[50vh] md:h-[100svh] shadow-black shadow-lg flex flex-col">
            {/* 本文（スクロール可能） */}
            <div className="flex-1 overflow-y-auto pt-20 px-4 space-y-3">
              {getChatMessageList().map((chat, index) => {
                const isUser = chat.type === "request"
                return (
                  <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm shadow
            ${
              isUser
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-200 text-gray-900 rounded-bl-none"
            }
          `}
                    >
                      {chat.message}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 入力欄（下固定） */}
            <div className="shadow-black shadow-sm sticky bottom-0 z-10 flex p-4 gap-4 border-t border-gray-200 bg-gray-90">
              <Textarea
                rows={2}
                value={chatInput}
                onChange={(e) => chatInputOnChange(e.target.value)}
                className="flex-1"
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
        <div className="hidden md:block">
          <PullTab
            position="left"
            size="mini"
            variant="pullTab-dark"
            icon="arrow_left"
            isShadow={true}
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DialogApp
