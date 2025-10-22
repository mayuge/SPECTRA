"use client"
import React, { useState } from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import ChatList from "@/components/organisms/homeSite/ui/menu/ChatApp"
import Button from "@/components/atoms/buttons/Button"
import Badge from "@/components/atoms/labels/Badge"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Textarea from "@/components/atoms/inputs/Textarea"
import PullTab from "@/components/atoms/buttons/PullTab"
import useDialogApp from "@/components/organisms/homeSite/core/application/menu/useDialogApp"

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

        <div className="md:hidden fixed bottom-0 left-0 w-full squareed-t-lg bg-white shadow-black shadow-lg flex flex-col z-20">
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
            />
            <Button
              size="large"
              variant="btn-primary"
              shape="square"
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
            <ChatList chatList={getChatMessageList()} />
            <div className="sticky bottom-0 z-10 border-t border-gray-200 bg-gray-90">
              <div className="p-2 bg-gray-80">
                <TextLabel
                  text="文脈判断できるチャットの例"
                  isBlack={true}
                  size="small"
                  bold={true}
                />
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    text="千葉県"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("千葉県")
                    }}
                  />
                  <Badge
                    text="横浜市"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("横浜市")
                    }}
                  />
                  <Badge
                    text="東京都千代田区霞が関１丁目"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("東京都千代田区霞が関１丁目")
                    }}
                  />
                  <Badge
                    text="渋谷駅"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("渋谷駅")
                    }}
                  />
                  <Badge
                    text="すべての駅"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("すべての駅")
                    }}
                  />
                  <Badge
                    text="駅から800m圏内"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("駅から800m圏内")
                    }}
                  />
                  <Badge
                    text="山手線"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("山手線")
                    }}
                  />
                  <Badge
                    text="すべての鉄道路線"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("すべての鉄道路線")
                    }}
                  />
                  <Badge
                    text="1日の運行本数が500本以上の鉄道路線"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("1日の運行本数が500本以上の鉄道路線")
                    }}
                  />
                  <Badge
                    text="スーパーマーケットから500m圏内"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("スーパーマーケットから500m圏内")
                    }}
                  />
                  <Badge
                    text="シェアサイクルポート"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("シェアサイクルポート")
                    }}
                  />
                  <Badge
                    text="ハローサイクリング"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("ハローサイクリング")
                    }}
                  />
                  <Badge
                    text="ドコモバイクシェア"
                    variant="badge-secondary"
                    shape="square"
                    onClick={() => {
                      manageChatMessage("ドコモバイクシェア")
                    }}
                  />
                </div>
              </div>
              <div className="shadow-black shadow-sm flex p-4 gap-4">
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
