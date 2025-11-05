import React from "react"
import type {
  PullTabPositionType,
  PullTabSizeType,
  PullTabVariantType,
} from "@/domain/types/atomsType"

type PullTabProps = {
  position: PullTabPositionType
  icon?: string
  isShadow?: boolean
  size?: PullTabSizeType
  variant?: PullTabVariantType
  onClick: () => void
}

const variantStyles: Record<PullTabVariantType, string> = {
  "pullTab-primary": "bg-primary text-white hover:bg-primaryDark",
  "pullTab-secondary":
    "bg-white text-primary border-2 border-primary shadow-[inset_0_0_0_2px_var(--primary-color)]",
  "pullTab-danger": "bg-danger text-white",
  "pullTab-warning": "bg-warning text-white",
  "pullTab-success": "bg-success text-white",
  "pullTab-dark": "bg-gray-20 text-white",
  "pullTab-light": "bg-white text-gray-20",
}

const paddingSize: Record<PullTabSizeType, string> = {
  mini: "p-0",
  small: "p-2",
  normal: "p-4",
  large: "p-6",
}

const positionShape: Record<PullTabPositionType, string> = {
  left: "rounded-r-lg py-2",
  right: "rounded-l-lg py-2",
  top: "rounded-b-lg px-2",
  bottom: "rounded-t-lg px-2",
}

const PullTab: React.FC<PullTabProps> = ({
  position,
  size = "normal",
  variant = "pullTab-primary",
  icon = "",
  isShadow = false,
  onClick,
}: PullTabProps) => {
  const btnVariant = variantStyles[variant] ?? variantStyles["pullTab-primary"]
  const btnPadding = paddingSize[size] ?? paddingSize["normal"]
  const btnShape = positionShape[position] ?? ""
  const buttonShadow = isShadow ? "shadow-sm shadow-black" : ""

  return (
    <button
      className={`${btnPadding} ${btnVariant} ${btnShape} ${buttonShadow} flex items-center`}
      onClick={onClick}
    >
      {icon && <span className="material-icons">{icon}</span>}
    </button>
  )
}

export default PullTab
