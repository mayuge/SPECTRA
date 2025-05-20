import React from "react"
import type { BadgeVariantType } from "@/domain/types/atomsType"

type BadgeProps = {
  text?: string // バッジテキスト
  shape?: string //バッジの形状を文字列で指定 square circle
  variant: BadgeVariantType // バッジのスタイル badge-primary, badge-secondary, badge-danger, badge-warning, badge-success のいずれかを指定
}

const Badge: React.FC<BadgeProps> = ({ text, shape, variant }: BadgeProps) => {
  // バッジのスタイルの種類 デフォルトは primary
  let badgeVariant = "bg-primary text-white border-[1px] border-primary"

  if (variant === "badge-secondary") {
    //variantがsecondaryのとき
    badgeVariant =
      "bg-white text-primary border-[1px] border-primary shadow-[inset_0_0_0_1px_var(--primary-color)]" // primary の色を使用
  } else if (variant === "badge-danger") {
    //variantがdangerのとき
    badgeVariant = "bg-danger text-white border-[1px] border-danger"
  } else if (variant === "badge-warning") {
    //variantがwarningのとき
    badgeVariant = "bg-warning text-white border-[1px] border-warning"
  } else if (variant === "badge-success") {
    //variantがsuccessのとき
    badgeVariant = "bg-success text-white border-[1px] border-success"
  } else if (variant === "badge-dark") {
    //variantがsuccessのとき
    badgeVariant = "bg-gray-30 text-white border-[1px] border-gray-30"
  }

  //バッジの形状の種類　circle square
  let cornerShape = "rounded"

  if (shape === "square") {
    cornerShape = "" //四角形の場合は角丸を指定しない
  } else if (shape === "circle") {
    cornerShape = "rounded-full" //円形の場合は角丸をfullにする
  }

  return (
    <div
      className={`${badgeVariant} ${cornerShape} inline-flex items-center gap-1 text-[10px] px-[4px] py-[3px]`} // flex と items-center を追加
    >
      {text}
    </div>
  )
}

export default Badge
