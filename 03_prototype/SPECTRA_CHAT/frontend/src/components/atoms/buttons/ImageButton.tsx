import React from "react"
import Image from "next/image"
import type { ButtonVariantType, ButtonSizeType, ButtonShapeType } from "@/domain/types/atomsType"

type ImageButtonProps = {
  text?: string
  iconLeft?: string
  iconRight?: string
  isShadow?: boolean
  shape?: ButtonShapeType
  size?: ButtonSizeType
  variant?: ButtonVariantType
  path: string
  onClick?: () => void
}

const variantStyles: Record<ButtonVariantType, string> = {
  "btn-primary": "bg-primary text-white hover:bg-primaryDark",
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

const ImageButton: React.FC<ImageButtonProps> = ({
  text = "",
  size = "normal",
  shape = "round",
  variant = "btn-primary",
  iconLeft = "",
  iconRight = "",
  isShadow = false,
  path,
  onClick,
}: ImageButtonProps) => {
  const btnVariant = variantStyles[variant] ?? variantStyles["btn-primary"]
  const cornerShape = shapeStyles[shape] ?? shapeStyles["round"]
  const buttonShadow = isShadow ? "shadow-md shadow-black" : ""

  return (
    <button
      className={`${paddingSize[size]} ${btnVariant} ${cornerShape} ${buttonShadow} flex items-center gap-1 md:text-base text-xs`}
      onClick={onClick}
    >
      {iconLeft && <span className="material-icons">{iconLeft}</span>}
      {path && <Image alt="Image" src={path} width={36} height={36} />}
      {text}
      {iconRight && <span className="material-icons">{iconRight}</span>}
    </button>
  )
}

export default ImageButton
