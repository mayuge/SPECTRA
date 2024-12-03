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
        src="/assets/platou_test_3.jpeg"
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
            <TextLabel text={`都市の本当の価値を\n可視化する`} size="xlarge" bold={true} />
          </div>
          <div className="my-12">
            <TextLabel
              text={`交通・不動産・犯罪・災害等さまざまなオープンデータを\nかけ合わせることで新たな気づきが生まれる`}
              size="large"
              bold={true}
            />
          </div>
          <div className="mt-8 mb-20">
            <Button
              text="ホームページに遷移する"
              iconRight="arrow_forward"
              variant="btn-dark"
              size="normal"
              shape="circle"
              onClick={navigateToHomeSite}
            />
          </div>
        </div>
      </div>
      <div className="h-[50vh] bg-gray-20"></div>
    </div>
  )
}

export default MenuSiteMain
