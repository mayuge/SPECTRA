"use client"
import React from "react"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import AccountCard from "@/components/molecules/frames/AccountCard"
import PullTab from "@/components/atoms/buttons/PullTab"

const LayerListBarApp: React.FC = () => {
  const { setLayerBarOpen, getLayerBarOpen } = useViewSiteMain()

  if (!getLayerBarOpen()) {
    return (
      <div className="flex items-center">
        <PullTab
          position="left"
          size="mini"
          variant="pullTab-light"
          icon="arrow_right"
          isShadow={true}
          onClick={() => {
            setLayerBarOpen(true)
          }}
        />
      </div>
    )
  }

  return (
    <div className="relative z-10 flex items-center">
      <div className="h-calc-100vh w-[300px] bg-back shadow-lg shadow-black overflow-y-auto no-scrollbar">
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
        <AccountCard
          logoImg=""
          text="野澤遼太郎"
          infoButtonClick={() => {}}
          dangerBadge="横浜国立大学"
          warningBadge="SAAP"
          successBadge="まなびばならは"
          primaryBadge="学生"
          darkBadge="理工学部"
        />
      </div>
      <PullTab
        position="left"
        size="mini"
        variant="pullTab-light"
        icon="arrow_left"
        isShadow={true}
        onClick={() => {
          setLayerBarOpen(false)
        }}
      />
    </div>
  )
}

export default LayerListBarApp
