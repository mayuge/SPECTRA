"use client"
import React from "react"
import Button from "@/components/atoms/buttons/Button"

import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const DisplayInfoApp: React.FC = () => {
  const { useCallback, getTimeData } = useViewSiteMain()
  return (
    <div className="absolute bottom-[55px] right-12 z-10">
      <div className="my-4">
        <Button
          text="鉄道・バス関連情報を見る"
          iconLeft="commute"
          variant="btn-dark"
          size="normal"
          shape="circle"
          isShadow={true}
          onClick={useCallback}
        />
      </div>

      <Button
        text={`データの更新時刻　${getTimeData()}`}
        iconLeft="refresh"
        variant="btn-dark"
        size="normal"
        shape="circle"
        isShadow={true}
        onClick={useCallback}
      />
    </div>
  )
}

export default DisplayInfoApp
