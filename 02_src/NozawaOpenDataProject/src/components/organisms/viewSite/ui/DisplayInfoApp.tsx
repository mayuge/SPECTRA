"use client"
import React from "react"
import Button from "@/components/atoms/buttons/Button"

import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const DisplayInfoApp: React.FC = () => {
  const { useCallback, getTimeData } = useViewSiteMain()
  return (
    <div className="absolute bottom-[55px] right-12 z-10">
      <Button
        text={`データの更新時刻　${getTimeData()}`}
        iconLeft="refresh"
        variant="btn-dark"
        size="small"
        shape="circle"
        isShadow={true}
        onClick={useCallback}
      />
    </div>
  )
}

export default DisplayInfoApp
