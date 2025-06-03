"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import PullTab from "@/components/atoms/buttons/PullTab"
import Badge from "@/components/atoms/labels/Badge"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import GridLogoButton from "@/components/atoms/buttons/GridLogoButton"
import Card from "@/components/molecules/frames/Card"

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
    <div className="w-[100svw] max-w-screen-lg z-50">
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
      <div className="max-w-screen-lg w-full mx-auto overflow-y-auto no-scrollbar h-[60vh] p-4 bg-white shadow-black shadow-lg z-50">
        <div className="pb-2 flex items-center">
          <Button size="mini" variant="btn-text-gray" iconLeft="filter_alt" />
          <TextLabel text="プリセットの選択" size="normal" isBlack={true} bold={false} />
        </div>
        <div className="flex-wrap items-center flex gap-2">
          <Badge variant="badge-primary" shape="circle" text="デフォルトプリセット" />
          <Badge variant="badge-secondary" shape="circle" text="都市計画プリセット" />
          <Badge variant="badge-secondary" shape="circle" text="鉄道路線プリセット" />
          <Badge variant="badge-secondary" shape="circle" text="不動産探しプリセット" />
          <Badge variant="badge-secondary" shape="circle" text="3Dレイヤープリセット" />
          <Badge variant="badge-secondary" shape="circle" text="都市計画プリセット" />
          <Badge variant="badge-secondary" shape="circle" text="鉄道路線プリセット" />
          <Badge variant="badge-secondary" shape="circle" text="不動産探しプリセット" />
        </div>
        <div className="pt-4">
          <hr className="border-gray-70" />
        </div>
        <div className="py-2 flex items-center">
          <Button size="mini" variant="btn-text-gray" iconLeft="layers" />
          <TextLabel text="レイヤーの選択" size="normal" isBlack={true} bold={false} />
        </div>
        <div>
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-primary"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
          <GridLogoButton
            path="/image/logo/default.webp"
            variant="btn-text-black"
            size="small"
            text="ベースマップ"
            shape="square"
            onClick={() => {
              setMainPanelOpen(false)
            }}
          />
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
        <Card
          isDisplayLayer={true}
          isShadow={false}
          logoImg="/image/logo/default.webp"
          dangerBadge="危険"
          darkBadge="ダーク"
          displayButtonClick={() => {}}
          infoButtonClick={() => {}}
          orderButtonClick={() => {}}
          primaryBadge="主要"
          shape="rounded"
          sliderClick={() => {}}
          successBadge="成功"
          text="現行版のレイヤの詳細設定がここで一つだけ表示されるイメージ"
          warningBadge="警告"
        />
      </div>
    </div>
  )
}

export default DialogApp
