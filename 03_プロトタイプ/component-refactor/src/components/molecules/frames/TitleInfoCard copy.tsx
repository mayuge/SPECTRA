import React from "react"
import Badge from "@/components/atoms/labels/Badge"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"

type TitleInfoCardProps = {
  text: string // カードテキスト
  logoImg: string // ロゴ画像のパス
  isShadow: boolean // 影の有無
  shape?: string // カードの形状を文字列で指定 square(四角形) circle（丸）デフォルトで角丸
}

const TitleInfoCard: React.FC<TitleInfoCardProps> = ({
  text,
  logoImg,
  shape,
  isShadow,
}: TitleInfoCardProps) => {
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
    <div className={`${cardVariant} ${cornerShape} ${buttonShadow} p-2 bg-gray-90`}>
      <div className="flex items-center w-full gap-1">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 text-black">
            <img src={logoImgPath} className="w-8 h-8" />
            <TextLabel text={text} size="normal" bold={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleInfoCard
