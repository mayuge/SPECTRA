import React from "react"
import type { ButtonVariantType, ButtonSizeType, ButtonShapeType } from "@/domain/types/atomsType"

type ButtonProps = {
  text?: string // ボタン中央にテキストを追加
  iconLeft?: string // ボタンテキストの左側にアイコンを追加
  iconRight?: string // ボタンテキストの右側にアイコンを追加
  isShadow?: boolean //ボタン周りの影の有無
  shape?: ButtonShapeType // ボタンの形状で指定 square circle round
  size: ButtonSizeType // ボタンの余白サイズ　mini、small、normal、large のいずれかを指定
  variant: ButtonVariantType // ボタンのスタイル色 btn-primary, btn-secondary, btn-danger, btn-warning, btn-success のいずれかを指定
  onClick?: () => void
}
const variantStyles: Record<ButtonVariantType, string> = {
  "btn-primary": "bg-primary text-gray-20 hover:bg-primaryDark",
  "btn-secondary":
    "bg-white text-primary border-2 border-primary shadow-[inset_0_0_0_2px_var(--primary-color)]",
  "btn-danger": "bg-danger text-white",
  "btn-warning": "bg-warning text-white",
  "btn-success": "bg-success text-white",
  "btn-dark": "bg-gray-20 text-white",
  "btn-light": "bg-white text-gray-20",
  "btn-text-black": "text-gray-20",
  "btn-text-gray": "text-gray-50",
  "btn-text-white": "text-white",
}

const shapeStyles: Record<ButtonShapeType, string> = {
  round: "rounded",
  square: "",
  circle: "rounded-full",
}

const paddingSize: Record<ButtonSizeType, string> = {
  mini: "p-0",
  small: "md:p-3 p-2",
  normal: "md:p-4 p-3",
  large: "md:p-6 p-4",
}

const Button: React.FC<ButtonProps> = ({
  text = "",
  size = "normal",
  shape = "round",
  variant = "btn-primary",
  iconLeft = "",
  iconRight = "",
  isShadow = false,
  onClick,
}: ButtonProps) => {
  const buttonVariant = variantStyles[variant] ?? variantStyles["btn-primary"]
  const cornerShape = shapeStyles[shape] ?? shapeStyles["round"]
  const buttonShadow = isShadow ? "shadow-md shadow-black" : ""

  return (
    <button
      className={`${paddingSize[size]} ${buttonVariant} ${cornerShape} ${buttonShadow} flex items-center gap-1 md:text-base text-xs leading-none`}
      onClick={onClick}
    >
      {iconLeft && <span className="material-icons">{iconLeft}</span>}
      {text}
      {iconRight && <span className="material-icons">{iconRight}</span>}
    </button>
  )
}

export default Button
