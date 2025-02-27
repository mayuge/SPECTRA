"use client"
import React, { useEffect, useState } from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const DisplayInfoApp: React.FC = () => {
  const {
    useCallback,
    getTrainModeSelected,
    getBusModeSelected,
    getCycleModeSelected,
    getWalkModeSelected,
    setTrainModeSelected,
    setBusModeSelected,
    setCycleModeSelected,
    setWalkModeSelected,
  } = useViewSiteMain()

  // ローカルステートに値を同期
  const [trainModeSelected, setTrainModeSelectedLocal] = useState(false)
  const [busModeSelected, setBusModeSelectedLocal] = useState(false)
  const [cycleModeSelected, setCycleModeSelectedLocal] = useState(false)
  const [walkModeSelected, setWalkModeSelectedLocal] = useState(false)

  useEffect(() => {
    setTrainModeSelectedLocal(getTrainModeSelected())
    setBusModeSelectedLocal(getBusModeSelected())
    setCycleModeSelectedLocal(getCycleModeSelected())
    setWalkModeSelectedLocal(getWalkModeSelected())
  }, [getTrainModeSelected(), getBusModeSelected(), getCycleModeSelected(), getWalkModeSelected()])

  return (
    <div className="absolute top-[115px] right-4 z-10">
      <div className="px-4 pb-4 rounded-full bg-gray-30 shadow-md shadow-black">
        <div className="pt-2 pb-1 px-4">
          <TextLabel text="交通手段切替" size="small" bold={false} isBlack={false} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            text={walkModeSelected ? "徒歩" : undefined}
            iconLeft="directions_walk"
            variant={walkModeSelected ? "btn-light" : "btn-dark"}
            size="small"
            shape="circle"
            isShadow={true}
            onClick={() => {
              setWalkModeSelected()
              setWalkModeSelectedLocal(!walkModeSelected)
              useCallback()
            }}
          />
          <Button
            text={cycleModeSelected ? "サイクル" : undefined}
            iconLeft="directions_bike"
            variant={cycleModeSelected ? "btn-light" : "btn-dark"}
            size="small"
            shape="circle"
            isShadow={true}
            onClick={() => {
              setCycleModeSelected()
              setCycleModeSelectedLocal(!cycleModeSelected)
              useCallback()
            }}
          />
          <Button
            text={busModeSelected ? "バス" : undefined}
            iconLeft="directions_bus"
            variant={busModeSelected ? "btn-light" : "btn-dark"}
            size="small"
            shape="circle"
            isShadow={true}
            onClick={() => {
              setBusModeSelected()
              setBusModeSelectedLocal(!busModeSelected)
              useCallback()
            }}
          />
          <Button
            text={trainModeSelected ? "鉄道" : undefined}
            iconLeft="train"
            variant={trainModeSelected ? "btn-light" : "btn-dark"}
            size="small"
            shape="circle"
            isShadow={true}
            onClick={() => {
              setTrainModeSelected()
              setTrainModeSelectedLocal(!trainModeSelected)
              useCallback()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DisplayInfoApp
