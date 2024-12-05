import React from "react"


type CardProps = {
  text: string // バッジテキスト
  shape?: string //バッジの形状を文字列で指定 square(四角形) round（角丸）
}

const Card: React.FC<CardProps> = ({ text, shape }: CardProps) => {
  // バッジのスタイルの種類 デフォルトは primary
  let badgeVariant = "bg-primary text-white hover:bg-primaryDark"
  
  //バッジの形状の種類　circle square
  let cornerShape = "rounded"

  if (shape === "square") {
    cornerShape = "" //四角形の場合は角丸を指定しない
  } else if (shape === "circle") {
    cornerShape = "rounded-full" //円形の場合は角丸をfullにする
  }

  return (
    <button
      className={`${badgeVariant} ${cornerShape} flex items-center gap-1 text-[8px] p-[3px]`} // flex と items-center を追加
    >
      {text}
    </button>
  )
}

export default Card
