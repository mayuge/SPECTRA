"use client"
import React from "react"
import MapApp from "@/components/organisms/homeSite/ui/MapApp"
import DialogApp from "@/components/organisms/homeSite/ui/DialogApp"
import ImageButton from "@/components/atoms/buttons/ImageButton"
import TextLabel from "@/components/atoms/labels/TextLabel"

const HomeSite: React.FC = () => {
  return (
    <div>
      <div className="absolute z-[10]">
        <div className="flex items-center bg-primary pr-4">
          <ImageButton
            size="small"
            variant="btn-primary"
            shape="square"
            path="/image/app/logoBlack.svg"
          />
          <TextLabel text="SPECTRA CHAT" size="large" bold={true} />
        </div>
      </div>
      <div className="absolute z-[10] left-1/2 bottom-0 -translate-x-1/2">
        <DialogApp />
      </div>
      <MapApp />
    </div>
  )
}

export default HomeSite
