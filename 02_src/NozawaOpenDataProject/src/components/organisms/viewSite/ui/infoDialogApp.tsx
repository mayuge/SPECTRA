"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const DetailInfoDialogApp: React.FC = () => {
  const { setDetailInfoDialogOpen, getDetailInfoDialogOpen } = useViewSiteMain()

  if (!getDetailInfoDialogOpen()) return null // 完全に非表示になった後にDOMを削除

  return (
    <div className="absolute top-[150px] right-0 p-4 z-10 ">
      <div className="relative  w-[50vw]">
        <DialogHeader
          text="交通情報"
          icon="close"
          variant="header-dark"
          size="normal"
          onClick={() => {
            setDetailInfoDialogOpen(false)
          }}
          isShadow={false}
        />
        <div className="h-[50vh] w-[50vw] min-h-[150px] min-w-[150px] bg-white rounded-b-lg shadow-md shadow-black">
          {/* サンプルテキストを追加 */}
          <p className="p-4 text-black"></p>
        </div>
      </div>
    </div>
  )
}

export default DetailInfoDialogApp
