import React from "react"
import type { BadgeVariantType, BadgeShapeType } from "@/domain/types/atomsType"

type BadgeProps = {
  text?: string // バッジテキスト
  shape?: BadgeShapeType //バッジの形状を文字列で指定
  variant: BadgeVariantType // バッジのスタイル badge-primary, badge-secondary, badge-danger, badge-warning, badge-success のいずれかを指定
  onClick?: () => void // クリック時のコールバック関数
}

const variantStyles: Record<BadgeVariantType, string> = {
  "badge-primary": "bg-primary text-white border-[1px] border-primary",
  "badge-secondary": "bg-secondary text-white border-[1px] border-secondary",
  "badge-danger": "bg-danger text-white border-[1px] border-danger",
  "badge-warning": "bg-warning text-white border-[1px] border-warning",
  "badge-success": "bg-success text-white border-[1px] border-success",
  "badge-dark": "bg-gray-30 text-white border-[1px] border-gray-30",
}

const shapeStyles: Record<BadgeShapeType, string> = {
  square: "",
  round: "rounded-xs",
  circle: "rounded-full",
}

const Badge: React.FC<BadgeProps> = ({
  text = "",
  shape = "square",
  variant = "badge-primary",
  onClick,
}: BadgeProps) => {
  const badgeVariant = variantStyles[variant] ?? variantStyles["badge-primary"]
  const cornerShape = shapeStyles[shape] ?? shapeStyles["square"]

  return (
    <div
      className={`${badgeVariant} ${cornerShape} inline-flex items-center gap-1 text-[9px] px-[4px] py-[4px]`}
      onClick={onClick}
    >
      {text}
    </div>
  )
}

export default Badge
