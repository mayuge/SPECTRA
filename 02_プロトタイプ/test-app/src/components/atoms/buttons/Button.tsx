import React from "react"
import type { ButtonVariantType } from "@/domain/types/atomsType"

type ButtonProps = {
  text?: string // ボタンテキスト
  icon?: string // アイコンの名前を文字列で指定
  shape?: string //ボタンの形状を文字列で指定 square circle
  size: string // mini、small、normal、large のいずれかを指定
  variant: ButtonVariantType // ボタンのスタイル btn-primary, btn-secondary, btn-danger, btn-warning, btn-success のいずれかを指定
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({
  text,
  size,
  shape,
  variant,
  icon,
  onClick,
}: ButtonProps) => {
  // サイズの種類　small normal largeから指定 paddingSize を動的に設定
  let paddingSize = "p-4" // デフォルトの padding

  if (size === "mini") {
    paddingSize = "p-0" // mini サイズの padding
  } else if (size === "small") {
    paddingSize = "p-2" // small サイズの padding
  } else if (size === "large") {
    paddingSize = "p-6" // large サイズの padding
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
  }

  //ボタンの形状の種類　circle square
  let cornerShape = "rounded"

  if (shape === "square") {
    cornerShape = "" //四角形の場合は角丸を指定しない
  } else if (shape === "circle") {
    cornerShape = "rounded-full" //円形の場合は角丸をfullにする
  }

  return (
    <button
      className={`${paddingSize} ${btnVariant} ${cornerShape} flex items-center gap-1`} // flex と items-center を追加
      onClick={onClick}
    >
      {icon && <span className="material-icons">{icon}</span>} {/* アイコンを表示*/}
      {text}
    </button>
  )
}

export default Button
