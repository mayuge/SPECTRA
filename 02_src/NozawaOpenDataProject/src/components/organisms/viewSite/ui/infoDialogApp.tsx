"use client"
import React from "react"
import DialogHeader from "@/components/molecules/header/DialogHeader"
import useViewSiteMain from "@/components/organisms/viewSite/core/application/useViewSiteMain"
import InfoCard from "@/components/molecules/frames/InfoCard"
import TitleInfoCard from "@/components/molecules/frames/TitleInfoCard"
const DetailInfoDialogApp: React.FC = () => {
  const {
    setDetailInfoDialogOpen,
    getDetailInfoDialogOpen,
    getGinzaInfo,
    getChiyodaInfo,
    getHanzomonInfo,
    getHibiyaInfo,
    getMarunouchiInfo,
    getMarunouchiBranchInfo,
    getTozaiInfo,
    getYurakuchoInfo,
    getNanbokuInfo,
    getHukutoshinInfo,
    getAsakusaInfo,
    getShinjukuInfo,
    getMitaInfo,
    getOedoInfo,
    getArakawaInfo,
    getNipporitoneriInfo,
    getChuoInfo,
    getChuoKaisokuInfo,
    getSoubuInfo,
    getKeihinTouhokuInfo,
    getMusasinoInfo,
    getYamanoteInfo,
  } = useViewSiteMain()

  if (!getDetailInfoDialogOpen()) return null // 完全に非表示になった後にDOMを削除

  return (
    <div className="absolute top-[150px] right-0 p-4 z-10 ">
      <div className="relative  md:w-[50vw] w-[90vw]">
        <DialogHeader
          text="交通情報"
          icon="close"
          variant="header-dark"
          size="normal"
          onClick={() => {
            setDetailInfoDialogOpen(false)
          }}
          isShadow={false}
        />
        <div className="h-[60vh] md:w-[50vw] w-[90vw] bg-white rounded-b-lg shadow-md shadow-black overflow-y-auto no-scrollbar">
          <TitleInfoCard
            text="都営地下鉄　運行情報"
            logoImg="assets/logos/TokyoLogo.webp"
            isShadow={false}
            shape="square"
          />
          <div className="ml-4">
            <InfoCard
              titleText="浅草線"
              text={getAsakusaInfo()}
              logoImg="assets/logos/TokyoLogo.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="三田線"
              text={getMitaInfo()}
              logoImg="assets/logos/TokyoLogo.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="新宿線"
              text={getShinjukuInfo()}
              logoImg="assets/logos/TokyoLogo.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="大江戸線"
              text={getOedoInfo()}
              logoImg="assets/logos/TokyoLogo.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="都電荒川線"
              text={getArakawaInfo()}
              logoImg="assets/logos/TokyoLogo.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="日暮里・舎人ライナー"
              text={getNipporitoneriInfo()}
              logoImg="assets/logos/TokyoLogo.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
          </div>
          <TitleInfoCard
            text="東京メトロ各線　運行情報"
            logoImg="assets/logos/TokyoMetro.webp"
            isShadow={false}
            shape="square"
          />
          <div className="ml-4">
            <InfoCard
              titleText="銀座線"
              text={getGinzaInfo()}
              logoImg="assets/logos/銀座線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="丸ノ内線"
              text={getMarunouchiInfo()}
              logoImg="assets/logos/丸ノ内線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="丸ノ内線支線"
              text={getMarunouchiBranchInfo()}
              logoImg="assets/logos/丸ノ内線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="日比谷線"
              text={getHibiyaInfo()}
              logoImg="assets/logos/日比谷線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="東西線"
              text={getTozaiInfo()}
              logoImg="assets/logos/東西線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="千代田線"
              text={getChiyodaInfo()}
              logoImg="assets/logos/千代田線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="有楽町線"
              text={getYurakuchoInfo()}
              logoImg="assets/logos/有楽町線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="半蔵門線"
              text={getHanzomonInfo()}
              logoImg="assets/logos/半蔵門線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="南北線"
              text={getNanbokuInfo()}
              logoImg="assets/logos/南北線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="副都心線"
              text={getHukutoshinInfo()}
              logoImg="assets/logos/副都心線.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
          </div>
          <TitleInfoCard
            text="JR　運行情報"
            logoImg="assets/logos/JrEast.webp"
            isShadow={false}
            shape="square"
          />
          <div className="ml-4">
            <InfoCard
              titleText="中央線"
              text={getChuoInfo()}
              logoImg="assets/logos/JrEast.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="中央線快速線"
              text={getChuoKaisokuInfo()}
              logoImg="assets/logos/JrEast.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="総武線"
              text={getSoubuInfo()}
              logoImg="assets/logos/JrEast.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="京浜東北線"
              text={getKeihinTouhokuInfo()}
              logoImg="assets/logos/JrEast.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="武蔵野線"
              text={getMusasinoInfo()}
              logoImg="assets/logos/JrEast.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
            <InfoCard
              titleText="山手線"
              text={getYamanoteInfo()}
              logoImg="assets/logos/JrEast.webp"
              isShadow={false}
              shape="square"
              infoButtonClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailInfoDialogApp
