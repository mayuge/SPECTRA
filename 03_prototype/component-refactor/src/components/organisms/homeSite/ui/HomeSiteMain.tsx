"use client"

import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Header from "@/components/molecules/header/Header"
import useHomeSiteMain from "@/components/organisms/homeSite/core/application/useHomeSiteMain"

const HomeSiteMain: React.FC = () => {
  const { navigateToSourceSite, navigateToViewSite } = useHomeSiteMain()

  return (
    <div className="relative">
      <img
        src="/assets/relationBackground.png
        "
        className="absolute w-[100%] h-[60%] object-cover z-[-1]"
      />
      <div className="relative p-4 justify-center">
        <div className="max-w-screen-xl w-full mx-auto">
          <Header
            text="Relaha"
            icon="home"
            size="large"
            variant="header-light"
            isCircle={true}
            onClick={() => {}}
          />
          <div className="my-12">
            <TextLabel
              text={`人とのつながりで\n世界が広がる`}
              size="xlarge"
              bold={true}
              isBlack={false}
            />
          </div>
          <div className="my-12">
            <TextLabel
              text={`鳥瞰的な視点を提供することによって、\n交通に新たな価値が生まれる`}
              size="large"
              bold={true}
              isBlack={false}
            />
          </div>
          <div className="my-8">
            <Button
              text="ログインはこちら"
              iconRight="arrow_forward"
              variant="btn-primary"
              size="normal"
              shape="circle"
              isShadow={true}
              onClick={navigateToViewSite}
            />
          </div>
          <div className="my-8">
            <Button
              text="新規登録はこちら"
              iconRight="arrow_forward"
              variant="btn-warning"
              size="normal"
              shape="circle"
              isShadow={true}
              onClick={navigateToViewSite}
            />
          </div>
        </div>
      </div>
      <div className="h-max-[100vh] bg-gray-20 justify-center p-4">
        <div className="max-w-screen-xl w-full mx-auto m-4 ">
          <div className="my-8">
            <TextLabel text={`表示する交通手段を選択`} size="large" bold={true} isBlack={false} />
          </div>

          <div className="mt-8">
            <TextLabel text={`このプロジェクトについて`} size="large" bold={true} isBlack={false} />
          </div>
          <div className="my-4">
            <TextLabel
              text={`SPECTRA PROJECTは、新たな視点（perspective）を交通（transportation）に提供するためのWEBサービスです。\n公共交通オープンデータを3D地図上でカスタマイズすることができ、交通の新たな価値を可視化します。`}
              size="normal"
              bold={false}
              isBlack={false}
            />
          </div>
          <div className="my-8">
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

            <div className="my-8 bg-gray-20">
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
