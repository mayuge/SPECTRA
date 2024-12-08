import React from "react"
import Badge from "@/components/atoms/labels/Badge"
import Button from "@/components/atoms/buttons/Button"

type CardProps = {
  text: string // カードテキスト
  shape?: string //カードの形状を文字列で指定 square(四角形) circle（丸）デフォルトで角丸
  isShadow: boolean
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

  return (
    <div className={`${cardVariant} ${cornerShape} ${buttonShadow} p-2`}>
      <div className="flex items-center gap-1">
        <Badge variant="badge-danger" text={dangerBadge} />
        <Badge variant="badge-warning" text={warningBadge} />
        <Badge variant="badge-success" text={successBadge} />
        <Badge variant="badge-primary" text={primaryBadge} />
        <Badge variant="badge-dark" text={darkBadge} />
      </div>
      <div className="pt-2 flex items-center gap-1">
        <Button variant="btn-primary" size="mini" iconLeft="refresh" />
        <Button variant="btn-text-gray" size="mini" iconLeft="visibility" />
        {text}
      </div>
    </div>
  )
}

export default Card
