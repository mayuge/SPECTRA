"use client"

import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import Header from "@/components/molecules/header/Header"
import useMenuSiteMain from "@/components/organisms/menuSite/core/application/useMenuSiteMain"

const MenuSiteMain: React.FC = () => {
  const { buttonClicked, navigateToHomeSite, getCount } = useMenuSiteMain()

  return (
    <div className="relative">
      <img
        src="/assets/platou_test_4.png"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />

      <div className="relative p-4 justify-center">
        <div className="max-w-screen-xl w-full mx-auto mx-8">
          <Header
            text="NOZAWA OPENDATA PROJECT"
            icon="menu"
            size="large"
            variant="header-light"
            isCircle={true}
            onClick={buttonClicked}
          />
          <div className="my-12">
            <TextLabel
              text={`都市の本当の価値を\n可視化する`}
              size="xlarge"
              bold={true}
              isBlack={true}
            />
          </div>
          <div className="my-12">
            <TextLabel
              text={`交通・不動産・犯罪・災害等さまざまなオープンデータを\nかけ合わせることで新たな気づきが生まれる`}
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
              onClick={navigateToHomeSite}
            />
          </div>
        </div>
      </div>
      <div className="h-[50vh] bg-gray-20 justify-center p-8">
        <div className="max-w-screen-xl w-full mx-auto m-8 ">
          <div className="my-10">
            <TextLabel text={`カテゴリ別に都市を見る`} size="large" bold={true} isBlack={false} />
          </div>
          <div className="flex w-full gap-10">
            <Button
              text="交通から都市を見る"
              iconLeft="layers"
              variant="btn-light"
              size="normal"
              shape="circle"
              onClick={navigateToHomeSite}
            />
            <Button
              text="不動産から都市を見る"
              iconLeft="layers"
              variant="btn-light"
              size="normal"
              shape="circle"
              onClick={navigateToHomeSite}
            />
            <Button
              text="犯罪から都市を見る"
              iconLeft="layers"
              variant="btn-light"
              size="normal"
              shape="circle"
              onClick={navigateToHomeSite}
            />
            <Button
              text="災害から都市を見る"
              iconLeft="layers"
              variant="btn-light"
              size="normal"
              shape="circle"
              onClick={navigateToHomeSite}
            />
          </div>
          <div className="mt-16 mb-8">
            <TextLabel text={`リリースノート`} size="large" bold={true} isBlack={false}/>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuSiteMain
