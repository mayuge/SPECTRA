"use client"
import React, { useEffect } from "react"
import AccountListBarApp from "@/components/organisms/viewSite/ui/AccountListBarApp"
import DisplayInfoApp from "@/components/organisms/viewSite/ui/DisplayInfoApp"
import DisplaySwitchApp from "@/components/organisms/viewSite/ui/DisplaySwitchApp"
import HeaderApp from "@/components/organisms/viewSite/ui/HeaderApp"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import ModeDialogApp from "@/components/organisms/viewSite/ui/ProjectListApp"

const ViewSiteMain: React.FC = () => {
  const { useCallback } = useViewSiteMain()
  useEffect(() => {
    useCallback()
  }, [])
  //1分ごとに情報更新
  useEffect(() => {
    const interval = setInterval(() => {
      useCallback()
    }, 60000) // 1分（60秒）ごとに実行

    return () => clearInterval(interval)
  }, [useCallback])

  return (
    <div className="relative w-full h-screen">
      <HeaderApp />
      <div className="flex w-full justify-between bg-gray-20 h-calc-100vh">
        <div className="flex">
          <DisplaySwitchApp />
          <AccountListBarApp />
        </div>
        <ModeDialogApp />
      </div>
    </div>
  )
}

export default ViewSiteMain
