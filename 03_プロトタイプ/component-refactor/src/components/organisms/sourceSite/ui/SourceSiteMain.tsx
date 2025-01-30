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
      <div className="md:h-[100vh] h-[150vh] bg-gray-70 justify-center p-8">
        <div className="max-w-screen-xl w-full mx-auto m-4">
          <div className="mt-8">
            <TextLabel text={`シェアサイクル関連`} size="large" bold={true} isBlack={true} />
          </div>
          <div className="my-4">
            <TextLabel
              text={`オープンデータチャレンジ　ハローサイクリング各種情報`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`オープンデータチャレンジ　ドコモバイクシェア各種情報`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="mt-8">
            <TextLabel text={`バス関連`} size="large" bold={true} isBlack={true} />
          </div>
          <div className="my-4">
            <TextLabel
              text={`国土数値情報　バス（ライン）`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`バス停　オープンデータチャレンジ各社GTFS`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="mt-8">
            <TextLabel text={`鉄道関連`} size="large" bold={true} isBlack={true} />
          </div>
          <div className="my-4">
            <TextLabel
              text={`国土数値情報　鉄道（ライン）`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`国土数値情報　鉄道時系列（ライン）（ポイント）`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`鉄道リアルタイム運行状況　オープンデータチャレンジ　各社運行状況`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`鉄道ラインカラー　原則オープンデータチャレンジ内のものを使用。 一部こちらからも使用　https://ayaito.net/webtips/color_code/12224/#toc23`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`アイコン・ロゴマーク等　原則オープンデータチャレンジ内のものを使用。アイコンはこちらからも使用　http://www.appli-cation.com/ill/`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="mt-8">
            <TextLabel text={`その他`} size="large" bold={true} isBlack={true} />
          </div>
          <div className="my-4">
            <TextLabel
              text={`plateau画像　https://plateauview.mlit.go.jp/`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`アイコン　GoogleMaterialICon`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`国土数値情報　鉄道時系列（ライン）（ポイント）`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`OpenStreetMap`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`Googleマップ`}
              size="normal"
              bold={false}
              isBlack={true}
            />
          </div>
          <div className="my-4">
            <TextLabel
              text={`地理院地図　衛星画像`}
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
