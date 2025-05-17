"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"

const DialogApp: React.FC = () => {
  return (
    <div className="w-[100svw]">
      <DialogHeader
        text="操作用ダイアログ"
        icon="close"
        size="normal"
        variant="header-dark"
        //shape="square"
        onClick={() => {}}
      />
      <div className="w-full h-[400px] bg-white shadow-black shadow-lg"></div>
    </div>
  )
}

export default DialogApp
