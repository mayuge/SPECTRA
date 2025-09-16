import React from "react"
import type {
  PullTabPositionType,
  PullTabSizeType,
  PullTabVariantType,
} from "@/domain/types/atomsType"

type PullTabProps = {
  position: PullTabPositionType
  icon?: string // アイコンの名前を文字列で指定
  isShadow?: boolean //影をつけるかつけないか
  size: PullTabSizeType // mini、small、normal、large のいずれかを指定
  variant: PullTabVariantType // ボタンのスタイル pullTab-primary, pullTab-secondary, pullTab-danger, pullTab-warning, pullTab-success のいずれかを指定
  onClick: () => void
}

const PullTab: React.FC<PullTabProps> = ({
  position,
  size,
  variant,
  icon,
  isShadow,
  onClick,
}: PullTabProps) => {
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
  let pullTabVariant = "bg-primary text-white hover:bg-primaryDark"

  if (variant === "pullTab-secondary") {
    //variantがsecondaryのとき
    pullTabVariant =
      "bg-white text-primary border-2 border-primary shadow-[inset_0_0_0_2px_var(--primary-color)]" // primary の色を使用、ボーダーの太さも考慮
  } else if (variant === "pullTab-danger") {
    //variantがdangerのとき
    pullTabVariant = "bg-danger text-white"
  } else if (variant === "pullTab-warning") {
    //variantがwarningのとき
    pullTabVariant = "bg-warning text-white"
  } else if (variant === "pullTab-success") {
    //variantがsuccessのとき
    pullTabVariant = "bg-success text-white"
  } else if (variant === "pullTab-dark") {
    //variantがdarkのとき
    pullTabVariant = "bg-gray-20 text-white"
  } else if (variant === "pullTab-light") {
    //variantがlightのとき
    pullTabVariant = "bg-white text-gray-20"
  }
  //ボタンの場所の種類
  let cornerShape = ""

  if (position === "left") {
    cornerShape = "rounded-r-lg py-2"
  } else if (position === "right") {
    cornerShape = "rounded-l-lg py-2"
  } else if (position === "top") {
    cornerShape = "rounded-b-lg px-2"
  } else if (position === "bottom") {
    cornerShape = "rounded-t-lg px-2"
  }

  let buttonShadow = ""
  if (isShadow === true) {
    buttonShadow = "shadow-sm shadow-black"
  }

  return (
    <button
      className={`${paddingSize} ${pullTabVariant} ${cornerShape} ${buttonShadow} flex items-center`} // flex と items-center を追加
      onClick={onClick}
    >
      {icon && <span className="material-icons">{icon}</span>} {/* アイコンを表示*/}
    </button>
  )
}

export default PullTab
