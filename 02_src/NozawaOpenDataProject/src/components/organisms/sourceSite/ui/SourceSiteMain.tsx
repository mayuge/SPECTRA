"use client"

import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Header from "@/components/molecules/header/Header"
import useSourceSiteMain from "@/components/organisms/sourceSite/core/application/useSourceSiteMain"

const SourceSiteMain: React.FC = () => {
  const { buttonClicked, navigateToViewSite, navigateToHomeSite } = useSourceSiteMain()

  return (
    <div className="relative">
      <img
        src="/assets/platou_test_4.png"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />
      <div className="relative p-4 justify-center">
        <div className="max-w-screen-xl w-full mx-auto">
          <Header
            text="SPECTRA PROJECT"
            icon="home"
            size="large"
            variant="header-light"
            isCircle={true}
            onClick={buttonClicked}
          />
          <div className="my-12">
            <TextLabel text={`参考資料`} size="xlarge" bold={true} isBlack={true} />
          </div>
          <div className="my-12">
            <TextLabel
              text={`当アプリケーションの開発にあたって、\n利用した資料を掲載いたします`}
              size="large"
              bold={true}
              isBlack={true}
            />
          </div>
          <div className="mt-8 mb-16">
            <Button
              text="トップページに戻る"
              iconRight="arrow_forward"
              variant="btn-dark"
              size="normal"
              shape="circle"
              isShadow={true}
              onClick={navigateToHomeSite}
            />
          </div>
        </div>
      </div>
      <div className="h-[10vh] flex items-center justify-center bg-gray-20">
        <div>
          <TextLabel text={`使用データ一覧`} size="large" bold={true} isBlack={false} />
        </div>
      </div>
      <div className="h-[50vh] bg-gray-70 justify-center p-8">
        <div className="max-w-screen-xl w-full mx-auto m-4">
          <div className="mt-8">
            <TextLabel text={`鉄道関連`} size="large" bold={true} isBlack={true} />
          </div>
          <div className="my-4">
            <TextLabel
              text={`2025年1月13日　本システムの公式Youtubeアカウントが公開されました`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`2025年1月14日　本システムの公式Youtube動画が公開されました`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`2025年1月15日　本システムが公式リリースしました`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SourceSiteMain
