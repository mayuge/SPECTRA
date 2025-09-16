import React from "react"
import type { ButtonVariantType, ButtonSizeType } from "@/domain/types/atomsType"

type ButtonProps = {
  text?: string // ボタンテキスト
  iconLeft?: string // アイコンの名前を文字列で指定
  iconRight?: string // アイコンの名前を文字列で指定
  isShadow?: boolean //影をつけるかつけないか
  isStretch?: boolean //ボタンを横幅いっぱいに広げるかどうか
  shape?: string //ボタンの形状を文字列で指定 square circle
  size: ButtonSizeType // mini、small、normal、large のいずれかを指定
  variant: ButtonVariantType // ボタンのスタイル btn-primary, btn-secondary, btn-danger, btn-warning, btn-success のいずれかを指定
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  text,
  size,
  shape,
  variant,
  iconLeft,
  iconRight,
  isShadow,
  isStretch,
  onClick,
}: ButtonProps) => {
  // サイズの種類　small normal largeから指定 paddingSize を動的に設定
  let paddingSize = "md:p-4 p-3" // デフォルトの padding
  let textSize = "md:text-base text-sm" // デフォルトの文字サイズ
  if (size === "mini") {
    paddingSize = "p-1" // mini サイズの padding
    textSize = "text-xs"
  } else if (size === "small") {
    paddingSize = "md:p-3 p-2" // small サイズの padding
    textSize = "text-sm"
  } else if (size === "large") {
    paddingSize = "md:p-6 p-4" // large サイズの padding
    textSize = "text-base"
  }

  // ボタンのスタイルの種類 デフォルトは primary
  let btnVariant = "bg-primary text-white hover:bg-primaryDark"

  if (variant === "btn-secondary") {
    //variantがsecondaryのとき
    btnVariant =
      "bg-white text-primary border-2 border-primary shadow-[inset_0_0_0_2px_var(--primary-color)]" // primary の色を使用、ボーダーの太さも考慮
  } else if (variant === "btn-danger") {
    //variantがdangerのとき
    btnVariant = "bg-danger text-white"
  } else if (variant === "btn-warning") {
    //variantがwarningのとき
    btnVariant = "bg-warning text-white"
  } else if (variant === "btn-success") {
    //variantがsuccessのとき
    btnVariant = "bg-success text-white"
  } else if (variant === "btn-dark") {
    //variantがdarkのとき
    btnVariant = "bg-gray-20 text-white"
  } else if (variant === "btn-light") {
    //variantがlightのとき
    btnVariant = "bg-white text-gray-20"
  } else if (variant === "btn-text-black") {
    //variantがtext-blackのとき
    btnVariant = "text-gray-20"
  } else if (variant === "btn-text-gray") {
    //variantがtext-grayのとき
    btnVariant = "text-gray-50"
  } else if (variant === "btn-text-white") {
    //variantがtext-whiteのとき
    btnVariant = "text-white"
  }

  //ボタンの形状の種類　circle square
  let cornerShape = "rounded"

  if (shape === "square") {
    cornerShape = "" //四角形の場合は角丸を指定しない
  } else if (shape === "circle") {
    cornerShape = "rounded-full" //円形の場合は角丸をfullにする
  }

  let buttonShadow = ""
  if (isShadow === true) {
    buttonShadow = "shadow-md shadow-black"
  }

  let buttonStretch = ""
  if (isStretch === true) {
    buttonStretch = "w-full"
  }

  return (
    <button
      className={`${paddingSize} ${btnVariant} ${cornerShape} ${buttonShadow} ${buttonStretch} flex items-center justify-center gap-1 md:text-base text-xs`} // flex と items-center を追加
      onClick={onClick}
    >
      {iconLeft && <span className={`${textSize} material-icons`}>{iconLeft}</span>}
      {text && <span className={`${textSize}`}>{text}</span>}
      {iconRight && <span className={`${textSize} material-icons`}>{iconRight}</span>}
    </button>
  )
}

export default Button
