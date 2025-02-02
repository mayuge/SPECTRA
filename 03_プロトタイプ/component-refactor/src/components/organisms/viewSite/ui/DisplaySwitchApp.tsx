"use client"
import React, { useEffect, useState } from "react"
import Button from "@/components/atoms/buttons/Button"
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
    <div className="h-calc-100vh gap-2 z-10 bg-gray-20 shadow-md shadow-black">
      <Button
        text=""
        iconLeft="person"
        variant={walkModeSelected ? "btn-light" : "btn-dark"}
        size="small"
        shape="square"
        isShadow={false}
        onClick={() => {
          setWalkModeSelected()
          useCallback()
        }}
      />
      <Button
        text=""
        iconLeft="groups"
        variant={cycleModeSelected ? "btn-light" : "btn-dark"}
        size="small"
        shape="square"
        isShadow={false}
        onClick={() => {
          setCycleModeSelected()
          useCallback()
        }}
      />
      <Button
        text=""
        iconLeft="folder"
        variant={busModeSelected ? "btn-light" : "btn-dark"}
        size="small"
        shape="square"
        isShadow={false}
        onClick={() => {
          setBusModeSelected()
          useCallback()
        }}
      />
      <Button
        text=""
        iconLeft="settings"
        variant={trainModeSelected ? "btn-light" : "btn-dark"}
        size="small"
        shape="square"
        isShadow={false}
        onClick={() => {
          setTrainModeSelected()
          useCallback()
        }}
      />
    </div>
  )
}

export default DisplayInfoApp
