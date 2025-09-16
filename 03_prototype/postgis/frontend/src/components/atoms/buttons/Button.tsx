import React from "react"
import type { ButtonVariantType, ButtonSizeType } from "@/domain/types/atomsType"

type ButtonProps = {
  text?: string // ボタンテキスト
  iconLeft?: string // アイコンの名前を文字列で指定
  iconRight?: string // アイコンの名前を文字列で指定
  isShadow?: boolean //影をつけるかつけないか
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
  onClick,
}: ButtonProps) => {
  // サイズの種類　small normal largeから指定 paddingSize を動的に設定
  let paddingSize = "md:p-4 p-3" // デフォルトの padding

  if (size === "mini") {
    paddingSize = "p-0" // mini サイズの padding
  } else if (size === "small") {
    paddingSize = "md:p-3 p-2" // small サイズの padding
  } else if (size === "large") {
    paddingSize = "md:p-6 p-4" // large サイズの padding
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

  return (
    <button
      className={`${paddingSize} ${btnVariant} ${cornerShape} ${buttonShadow} flex items-center gap-1 md:text-base text-xs leading-none`} // flex と items-center を追加
      onClick={onClick}
    >
      {iconLeft && <span className="material-icons">{iconLeft}</span>} {/* アイコンを表示*/}
      {text}
      {iconRight && <span className="material-icons">{iconRight}</span>}{" "}
      {/* アイコンを右寄せで表示*/}
    </button>
  )
}

export default Button
