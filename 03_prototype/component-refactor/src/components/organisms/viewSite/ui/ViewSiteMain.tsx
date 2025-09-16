"use client"
import React, { useEffect } from "react"
import AccountListBarApp from "@/components/organisms/viewSite/ui/AccountListBarApp"
import RelationApp from "@/components/organisms/viewSite/ui/RelationApp"
import SwitchApp from "@/components/organisms/viewSite/ui/SwitchApp"
import HeaderApp from "@/components/organisms/viewSite/ui/HeaderApp"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import ModeDialogApp from "@/components/organisms/viewSite/ui/ProjectListApp"
import ProfileApp from "@/components/organisms/viewSite/ui/ProfileApp"

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
      <div className="flex bg-gray-20 h-calc-100vh">
        <SwitchApp />
        <AccountListBarApp />
        <div className="w-full overflow-y-auto no-scrollbar">
          <RelationApp />
          <div className="flex flex-wrap justify-center">
            <ProfileApp />
          </div>
        </div>
        <ModeDialogApp />
      </div>
    </div>
  )
}

export default ViewSiteMain
