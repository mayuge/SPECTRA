"use client"
import React from "react"
import ImageButton from "@/components/atoms/buttons/ImageButton"
import TextLabel from "@/components/atoms/labels/TextLabel"

const HeaderApp: React.FC = () => {
  return (
    <div className="absolute z-[20]">
      <div className="flex items-center bg-primary/90 p-2 w-[100svw]">
        <ImageButton
          size="mini"
          variant="btn-primary"
          shape="square"
          path="/image/app/logoBlack.svg"
        />
        <div className="pl-2">
          <TextLabel text="SPECTRA CHAT" size="large" bold={true} />
        </div>
      </div>
    </div>
  )
}

export default HeaderApp
