import React from "react"
import Badge from "@/components/atoms/labels/Badge"
import Button from "@/components/atoms/buttons/Button"

type CardProps = {
  text: string // カードテキスト
  shape?: string //カードの形状を文字列で指定 square(四角形) round（角丸）
  isShadow: boolean
}

const Card: React.FC<CardProps> = ({ text, shape }: CardProps) => {
  // カードのスタイルの種類 デフォルトは primary
  let cardVariant = "bg-white"

  //カードの形状の種類　circle square
  let cornerShape = "rounded"

  if (shape === "square") {
    cornerShape = "" //四角形の場合は角丸を指定しない
  } else if (shape === "round") {
    cornerShape = "rounded-lg" //角丸
  }

  return (
    <div className={`${cardVariant} ${cornerShape} `}>
      <div className="flex items-center gap-1">
        <Badge variant="badge-warning" text="テキスト" />
        <Badge variant="badge-warning" text="テキスト" />
        <Badge variant="badge-warning" text="テキスト" />
        <Badge variant="badge-warning" text="テキスト" />
      </div>
      <div className="py-2 flex items-center gap-1">
        <Button variant="btn-text-gray" size="mini" iconLeft="visibility" />
        {text}
      </div>
    </div>
  )
}

export default Card
