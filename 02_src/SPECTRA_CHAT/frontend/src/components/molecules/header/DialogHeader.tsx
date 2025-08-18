import React from "react"
import Button from "@/components/atoms/buttons/Button"
import type { ButtonVariantType } from "@/domain/types/atomsType"
import type { HeaderVariantType, HeaderSizeType } from "@/domain/types/moleculesType"

type DialogHeaderProps = {
  text?: string // ヘッダーテキスト
  icon?: string // アイコンの名前を文字列で指定
  size: HeaderSizeType // mini、small、normal、large のいずれかを指定
  variant: HeaderVariantType // ヘッダーのスタイル header-primary, header-secondary, header-danger, header-warning, header-success のいずれかを指定
  shape?: string //ヘッダーを角丸にする
  isPullIcon?: boolean // プルアイコンを表示するかどうか
  isShadow?: boolean //影をつける
  onClick: () => void
}

const DialogHeader: React.FC<DialogHeaderProps> = ({
  text,
  size,
  variant,
  icon,
  isPullIcon,
  shape,
  isShadow,
  onClick,
}: DialogHeaderProps) => {
  // ヘッダーのスタイルの種類 デフォルトは primary
  let headerVariant = "bg-primary text-white"
  let buttonVariant: ButtonVariantType = "btn-primary"
  if (variant === "header-secondary") {
    //variantがsecondaryのとき
    headerVariant =
      "bg-white text-primary border-2 border-primary shadow-[inset_0_0_0_2px_var(--primary-color)]" // primary の色を使用、ボーダーの太さも考慮
    buttonVariant = "btn-secondary"
  } else if (variant === "header-danger") {
    //variantがdangerのとき
    headerVariant = "bg-danger text-white"
    buttonVariant = "btn-danger"
  } else if (variant === "header-warning") {
    //variantがwarningのとき
    headerVariant = "bg-warning text-white"
    buttonVariant = "btn-warning"
  } else if (variant === "header-success") {
    //variantがsuccessのとき
    headerVariant = "bg-success text-white"
    buttonVariant = "btn-success"
  } else if (variant === "header-dark") {
    //variantがdarkのとき
    headerVariant = "bg-gray-20 text-white"
    buttonVariant = "btn-dark"
  } else if (variant === "header-light") {
    //variantがlightのとき
    headerVariant = "bg-white text-gray-20"
    buttonVariant = "btn-light"
  }

  //形の種類
  let headerShape = "rounded-t-lg"
  let buttonShape = ""
  if (shape === "circle") {
    headerShape = "rounded-t-full"
    buttonShape = "circle"
  } else if (shape === "square") {
    headerShape = ""
    buttonShape = "square"
  }
  let headerShadow = ""
  if (isShadow === true) {
    headerShadow = " shadow-black shadow-md"
  }
  return (
    <div
      onClick={onClick}
      className={`${headerVariant} ${headerShape} ${headerShadow} ${buttonShape} w-full flex flex-col`}
    >
      {isPullIcon && (
        <div className="absolute top-1 left-1/2 -translate-x-1/2">
          <div className="h-[4px] w-10 bg-gray-50 rounded-full" />
        </div>
      )}
      <div className="flex items-center justify-between px-4 md:text-base text-xs font-bold w-full">
        <div className="text-inherit">{text}</div>
        {icon && (
          <Button
            variant={buttonVariant}
            shape="circle"
            iconLeft={icon}
            size={size}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  )
}

export default DialogHeader
