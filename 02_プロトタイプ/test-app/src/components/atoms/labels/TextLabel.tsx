import React from "react"

type TextLabelProps = {
  text: string // テキスト
  size: string // mini、small、normal、large のいずれかを指定
  bold: boolean //文字の太さ
}

const TextLabel: React.FC<TextLabelProps> = ({ text, size, bold }: TextLabelProps) => {
  // サイズの種類　small normal largeから指定 fontSize を設定
  let fontSize = "text-base" // デフォルトのサイズ

  if (size === "mini") {
    fontSize = "text-[8px]" // mini サイズの padding
  } else if (size === "small") {
    fontSize = "text-xs" // small サイズの padding
  } else if (size === "large") {
    fontSize = "text-2xl" // large サイズの padding
  }

  //文字の太さ
  let fontBold = ""
  if (bold) {
    fontBold = "text-extrabold" //boldがtrueならば、文字を太くする
  }

  return (
    <button
      className={`${fontSize}`} // flex と items-center を追加
    >
      {text}
    </button>
  )
}

export default TextLabel
