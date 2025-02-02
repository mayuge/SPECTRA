import React from "react"

type TextLabelProps = {
  text: string // テキスト
  size: "mini" | "small" | "normal" | "large" | "xlarge" // mini、small、normal、large,xlarge のいずれかを指定
  bold: boolean // 文字の太さ
  isBlack?: boolean //文字色
}

const TextLabel: React.FC<TextLabelProps> = ({ text, size, bold, isBlack }: TextLabelProps) => {
  let textColor = "text-black" // デフォルトの文字色は黒
  if (isBlack === false) {
    textColor = "text-white"
  }

  // サイズの種類　small normal largeから指定 fontSize を設定
  let fontSize = "md:text-base text-xs" // デフォルトのサイズ

  if (size === "mini") {
    fontSize = "text-[8px]" // mini サイズ
  } else if (size === "small") {
    fontSize = "text-xs" // small サイズ
  } else if (size === "large") {
    fontSize = "md:text-2xl text-lg" // large サイズ
  } else if (size === "xlarge") {
    fontSize = "md:text-6xl text-3xl" // large サイズ
  }

  // 文字の太さ
  let fontBold = bold ? "font-bold" : "" // boldがtrueならば、文字を太くする

  return <p className={`${fontSize} ${fontBold} ${textColor} whitespace-pre-line`}>{text}</p>
}

export default TextLabel
