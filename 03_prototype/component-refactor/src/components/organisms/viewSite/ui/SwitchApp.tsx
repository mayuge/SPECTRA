"use client"
import React, { useEffect, useState } from "react"
import Button from "@/components/atoms/buttons/Button"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"

const SwitchApp: React.FC = () => {
  const {
    useCallback,
    getFileModeSelected,
    getGroupModeSelected,
    getPersonModeSelected,
    getHomeModeSelected,
    setFileModeSelected,
    setGroupModeSelected,
    setPersonModeSelected,
    setHomeModeSelected,
  } = useViewSiteMain()

  // ローカルステートに値を同期
  const [FileModeSelected, setFileModeSelectedLocal] = useState(false)
  const [GroupModeSelected, setGroupModeSelectedLocal] = useState(false)
  const [PersonModeSelected, setPersonModeSelectedLocal] = useState(false)
  const [HomeModeSelected, setHomeModeSelectedLocal] = useState(false)

  useEffect(() => {
    setFileModeSelectedLocal(getFileModeSelected())
    setGroupModeSelectedLocal(getGroupModeSelected())
    setPersonModeSelectedLocal(getPersonModeSelected())
    setHomeModeSelectedLocal(getHomeModeSelected())
  }, [
    getFileModeSelected(),
    getGroupModeSelected(),
    getPersonModeSelected(),
    getHomeModeSelected(),
  ])

  return (
    <div className="h-calc-100vh gap-2 z-10 bg-gray-20 shadow-md shadow-black">
      <Button
        text=""
        iconLeft="home"
        variant={HomeModeSelected ? "btn-danger" : "btn-dark"}
        size="small"
        shape="square"
        isShadow={false}
        onClick={() => {
          setHomeModeSelected()
          useCallback()
        }}
      />
      <Button
        text=""
        iconLeft="person"
        variant={PersonModeSelected ? "btn-warning" : "btn-dark"}
        size="small"
        shape="square"
        isShadow={false}
        onClick={() => {
          setPersonModeSelected()
          useCallback()
        }}
      />
      <Button
        text=""
        iconLeft="groups"
        variant={GroupModeSelected ? "btn-success" : "btn-dark"}
        size="small"
        shape="square"
        isShadow={false}
        onClick={() => {
          setGroupModeSelected()
          useCallback()
        }}
      />
      <Button
        text=""
        iconLeft="folder"
        variant={FileModeSelected ? "btn-primary" : "btn-dark"}
        size="small"
        shape="square"
        isShadow={false}
        onClick={() => {
          setFileModeSelected()
          useCallback()
        }}
      />
    </div>
  )
}

export default SwitchApp
