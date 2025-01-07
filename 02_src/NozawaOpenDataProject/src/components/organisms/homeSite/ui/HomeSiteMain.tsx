"use client"

import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Header from "@/components/molecules/header/Header"
import useHomeSiteMain from "@/components/organisms/homeSite/core/application/useHomeSiteMain"

const HomeSiteMain: React.FC = () => {
  const { buttonClicked, navigateToViewSite, navigateToSourceSite } = useHomeSiteMain()

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
            icon="menu"
            size="large"
            variant="header-light"
            isCircle={true}
            onClick={() => {}}
          />
          <div className="my-12">
            <TextLabel
              text={`交通の新たな価値を\n可視化する`}
              size="xlarge"
              bold={true}
              isBlack={true}
            />
          </div>
          <div className="my-12">
            <TextLabel
              text={`鳥瞰的な視点を提供することによって、\n交通に新たな価値が生まれる`}
              size="large"
              bold={true}
              isBlack={true}
            />
          </div>
          <div className="mt-8 mb-16">
            <Button
              text="オープンデータを見る"
              iconRight="arrow_forward"
              variant="btn-dark"
              size="normal"
              shape="circle"
              isShadow={true}
              onClick={navigateToViewSite}
            />
          </div>
        </div>
      </div>
      <div className="h-[65vh] bg-gray-20 justify-center p-8">
        <div className="max-w-screen-xl w-full mx-auto m-8 ">
          <div className="my-10">
            <TextLabel text={`交通手段別で見る`} size="large" bold={true} isBlack={false} />
          </div>
          <div className="flex flex-wrap w-full gap-4 sm:gap-6 md:gap-10">
            <Button
              text="鉄道中心で見る"
              iconLeft="train"
              variant="btn-light"
              size="normal"
              shape="circle"
              isShadow={true}
              onClick={navigateToViewSite}
            />
            <Button
              text="バス中心で見る"
              iconLeft="directions_bus"
              variant="btn-light"
              size="normal"
              shape="circle"
              isShadow={true}
              onClick={navigateToViewSite}
            />
            <Button
              text="シェアサイクル中心で見る"
              iconLeft="directions_bike"
              variant="btn-light"
              size="normal"
              shape="circle"
              isShadow={true}
              onClick={navigateToViewSite}
            />
            <Button
              text="徒歩中心で見る"
              iconLeft="directions_walk"
              variant="btn-light"
              size="normal"
              shape="circle"
              isShadow={true}
              onClick={navigateToViewSite}
            />
          </div>

          <div className="mt-16 mb-8">
            <TextLabel text={`リリースノート`} size="large" bold={true} isBlack={false} />
          </div>
          <div className="my-4">
            <TextLabel
              text={`2025年1月13日　本システムの公式Youtubeアカウントが公開されました`}
              size="normal"
              bold={false}
              isBlack={false}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`2025年1月14日　本システムの公式Youtube動画が公開されました`}
              size="normal"
              bold={false}
              isBlack={false}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`2025年1月15日　本システムが公式リリースしました`}
              size="normal"
              bold={false}
              isBlack={false}
            />
            <div className="my-8">
              <Button
                text="参考資料を見る"
                iconLeft="text_snippet"
                iconRight="arrow_forward"
                variant="btn-light"
                size="normal"
                shape="circle"
                isShadow={true}
                onClick={navigateToSourceSite}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSiteMain
