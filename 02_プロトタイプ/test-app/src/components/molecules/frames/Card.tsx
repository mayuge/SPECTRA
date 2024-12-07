import React from "react"
import Badge from "@/components/atoms/labels/Badge"

type CardProps = {
  text: string // カードテキスト
  shape?: string //カードの形状を文字列で指定 square(四角形) round（角丸）
}

const Card: React.FC<CardProps> = ({ text, shape }: CardProps) => {
  // カードのスタイルの種類 デフォルトは primary
  let badgeVariant = "bg-primary text-white hover:bg-primaryDark"

  //カードの形状の種類　circle square
  let cornerShape = "rounded"

  if (shape === "square") {
    cornerShape = "" //四角形の場合は角丸を指定しない
  } else if (shape === "circle") {
    cornerShape = "rounded-full" //円形の場合は角丸をfullにする
  }

  return (
    <div
      className={`${badgeVariant} ${cornerShape} flex items-center gap-1 text-[8px] p-[3px]`} // flex と items-center を追加
    >
      {text}
    </div>
  )
}

export default Card
