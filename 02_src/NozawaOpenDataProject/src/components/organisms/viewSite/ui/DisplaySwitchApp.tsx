"use client"
import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"

import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const DisplayInfoApp: React.FC = () => {
  const { useCallback, getTimeData } = useViewSiteMain()
  return (
    <div className="absolute top-[115px] right-4 z-10">
      <div className="px-4 pb-4 rounded-full bg-gray-30 shadow-md shadow-black">
      <div className="pt-2 pb-1 px-4">
        <TextLabel text="交通手段切替" size="small" bold={false} isBlack={false} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          text={`徒歩`}
          iconLeft="directions_walk"
          variant="btn-light"
          size="small"
          shape="circle"
          isShadow={true}
          onClick={useCallback}
        />
        <Button
          text={``}
          iconLeft="directions_bike"
          variant="btn-dark"
          size="small"
          shape="circle"
          isShadow={true}
          onClick={useCallback}
        />
        <Button
          text={``}
          iconLeft="directions_bus"
          variant="btn-dark"
          size="small"
          shape="circle"
          isShadow={true}
          onClick={useCallback}
        />
        <Button
          text={``}
          iconLeft="train"
          variant="btn-dark"
          size="small"
          shape="circle"
          isShadow={true}
          onClick={useCallback}
        />
      </div>
      </div>
    </div>
  )
}

export default DisplayInfoApp
