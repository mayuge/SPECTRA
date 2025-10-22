"use client"
import React from "react"
import ImageButton from "@/components/atoms/buttons/ImageButton"
import TextLabel from "@/components/atoms/labels/TextLabel"

const HeaderApp: React.FC = () => {
  return (
    <div className="absolute z-[20] flex items-center bg-primary p-2 w-[100svw]">
      <ImageButton
        size="mini"
        variant="btn-primary"
        shape="square"
        path="/image/app/logoBlack.svg"
      />
      <header className="pl-1 font-headfont text-2xl">
        <h1>SPECTRA CHAT</h1>
      </header>
    </div>
  )
}

export default HeaderApp
