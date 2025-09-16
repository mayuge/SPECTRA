import React from "react"
import Badge from "@/components/atoms/labels/Badge"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"

type InfoCardProps = {
  titleText: string
  text: string // カードテキスト
  logoImg: string // ロゴ画像のパス
  isShadow: boolean // 影の有無
  shape?: string // カードの形状を文字列で指定 square(四角形) circle（丸）デフォルトで角丸
  infoButtonClick: () => void
}

const InfoCard: React.FC<InfoCardProps> = ({
  titleText,
  text,
  logoImg,
  shape,
  isShadow,
  infoButtonClick,
}: InfoCardProps) => {
  // カードのスタイルの種類 デフォルトは primary
  let cardVariant = "bg-white"

  // カードの形状の種類 circle square
  let cornerShape = "rounded-lg"

  if (shape === "square") {
    cornerShape = "" // 四角形の場合は角丸を指定しない
  } else if (shape === "round") {
    cornerShape = "rounded-full" // 円形の角
  }

  let buttonShadow = ""
  if (isShadow) {
    buttonShadow = "shadow-md shadow-black"
  }

  // ロゴ画像のパス
  let logoImgPath = "/assets/logos/default.webp"
  if (logoImg) {
    logoImgPath = logoImg
  }

  return (
    <div className={`${cardVariant} ${cornerShape} ${buttonShadow} p-2 hover:bg-gray-90`}>
      <div className="flex items-center w-full gap-1">
        <div className="w-full">
          <div className="pb-1 flex justify-between gap-2">
            <div className="inline-flex items-center gap-4 text-black">
              <img src={logoImgPath} className="w-7 h-7" />
              <TextLabel text={titleText} size="normal" bold={true} />
              <TextLabel text={text} size="normal" bold={false} />
            </div>
            <div>
              <Button
                variant="btn-text-gray"
                size="mini"
                iconLeft="open_in_new"
                onClick={infoButtonClick}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-70" />
    </div>
  )
}

export default InfoCard
