import React from "react"
import Badge from "@/components/atoms/labels/Badge"
import Button from "@/components/atoms/buttons/Button"
import BaseColorInput from "@/components/atoms/Inputs/ColorInput"
import BaseSliderInput from "@/components/atoms/Inputs/SliderInput"

type CardProps = {
  text: string // カードテキスト
  isShadow: boolean //影の有無
  shape?: string //カードの形状を文字列で指定 square(四角形) circle（丸）デフォルトで角丸
  displayButtonClick: () => void
  refreshButtonClick: () => void
  isDisplayLayer: boolean
  dangerBadge?: string
  warningBadge?: string
  successBadge?: string
  primaryBadge?: string
  darkBadge?: string
}

const Card: React.FC<CardProps> = ({
  text,
  shape,
  isShadow,
  dangerBadge,
  warningBadge,
  successBadge,
  primaryBadge,
  darkBadge,
  isDisplayLayer,
  displayButtonClick,
  refreshButtonClick,
}: CardProps) => {
  // カードのスタイルの種類 デフォルトは primary
  let cardVariant = "bg-white"

  //カードの形状の種類　circle square
  let cornerShape = "rounded-lg"

  if (shape === "square") {
    cornerShape = "" //四角形の場合は角丸を指定しない
  } else if (shape === "round") {
    cornerShape = "rounded-full" //円形の角
  }

  let buttonShadow = ""
  if (isShadow === true) {
    buttonShadow = "shadow-md shadow-black"
  }

  //目のアイコンで表示・非表示を示す
  let displayIcon = ""
  if (isDisplayLayer === true) {
    displayIcon = "visibility"
  } else if (isDisplayLayer === false) {
    displayIcon = "visibility_off"
  }

  return (
    <div className={`${cardVariant} ${cornerShape} ${buttonShadow} pt-1`}>
      <div className="flex items-center gap-1">
        {dangerBadge && <Badge variant="badge-danger" text={dangerBadge} />}
        {warningBadge && <Badge variant="badge-warning" text={warningBadge} />}
        {successBadge && <Badge variant="badge-success" text={successBadge} />}
        {primaryBadge && <Badge variant="badge-primary" text={primaryBadge} />}
        {darkBadge && <Badge variant="badge-dark" text={darkBadge} />}
      </div>
      <div className="flex items-center w-full gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="btn-text-gray"
            size="mini"
            iconLeft={`${displayIcon}`}
            onClick={displayButtonClick}
          />
          <hr className="w-[1px] h-[35px] bg-gray-60" />
        </div>
        <div className="w-full">
          <div className="pb-1 flex justify-between">
            <div className=" inline-flex items-center gap-2">
              <img src="/assets/logos/jreast.webp" className="w-5 h-5" />
              {text}
            </div>
            <div>
              <Button
                variant="btn-text-gray"
                size="mini"
                iconLeft="info"
                onClick={refreshButtonClick}
              />
            </div>
          </div>
          <div className="pb-1 flex justify-between">
            <div className=" inline-flex items-center gap-2">
              <BaseColorInput onChange={refreshButtonClick} />
              <BaseSliderInput onChange={refreshButtonClick} min={0} max={1.0} step={0.1} />
            </div>
            <div>
              <Button
                variant="btn-text-gray"
                size="mini"
                iconLeft="swap_vert"
                onClick={refreshButtonClick}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-70" />
    </div>
  )
}

export default Card
