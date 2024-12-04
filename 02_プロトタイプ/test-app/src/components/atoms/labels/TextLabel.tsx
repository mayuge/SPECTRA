import React from "react"

type TextLabelProps = {
  text: string // テキスト
  size: string // mini、small、normal、large,xlarge のいずれかを指定
  bold: boolean // 文字の太さ
  isBlack?: boolean //文字色
}

const TextLabel: React.FC<TextLabelProps> = ({ text, size, bold, isBlack }: TextLabelProps) => {
  let textColor = ""
  if (!isBlack) {
    textColor = "text-white"
  }

  // サイズの種類　small normal largeから指定 fontSize を設定
  let fontSize = "text-base" // デフォルトのサイズ

  if (size === "mini") {
    fontSize = "text-[8px]" // mini サイズの padding
  } else if (size === "small") {
    fontSize = "text-xs" // small サイズの padding
  } else if (size === "large") {
    fontSize = "text-2xl" // large サイズの padding
  } else if (size === "xlarge") {
    fontSize = "text-6xl" // large サイズの padding
  }

  // 文字の太さ
  let fontBold = bold ? "font-bold" : "" // boldがtrueならば、文字を太くする

  return <p className={`${fontSize} ${fontBold} ${textColor} whitespace-pre-line`}>{text}</p>
}

export default TextLabel
