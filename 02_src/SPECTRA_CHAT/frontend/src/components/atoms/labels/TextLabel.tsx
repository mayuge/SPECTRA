import React from "react"
import type { TextLabelSizeType } from "@/domain/types/atomsType"

type TextLabelProps = {
  text: string
  size?: TextLabelSizeType
  bold?: boolean
  isBlack?: boolean
}

const fontSizeStyles: Record<TextLabelSizeType, string> = {
  mini: "text-[8px]",
  small: "text-xs",
  normal: "md:text-base text-xs",
  large: "md:text-2xl text-lg",
  xlarge: "md:text-6xl text-3xl",
}

const TextLabel: React.FC<TextLabelProps> = ({
  text,
  size = "normal",
  bold = false,
  isBlack = true,
}: TextLabelProps) => {
  const textColor = isBlack ? "text-black" : "text-white"
  const fontSize = fontSizeStyles[size] ?? fontSizeStyles["normal"]
  const fontBold = bold ? "font-bold" : ""

  return <p className={`${fontSize} ${fontBold} ${textColor} whitespace-pre-line`}>{text}</p>
}

export default TextLabel
