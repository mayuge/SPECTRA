"use client"
import React from "react"
import MapApp from "@/components/organisms/homeSite/ui/MapApp"
import ImageButton from "@/components/atoms/buttons/ImageButton"
import SearchInput from "@/components/molecules/forms/SearchInput"

const HomeSite: React.FC = () => {
  return (
    <div>
      <div className="absolute z-[10]">
        <div className="flex items-center bg-white">
          <ImageButton
            size="normal"
            variant="btn-primary"
            shape="square"
            path="/image/app/logoWhite.svg"
          />
          <SearchInput
            placeholder="場所を検索"
            isStretch={false}
            size="large"
            onChange={() => {}}
            onClick={() => {}}
          />
        </div>
      </div>
      <MapApp />
    </div>
  )
}

export default HomeSite
