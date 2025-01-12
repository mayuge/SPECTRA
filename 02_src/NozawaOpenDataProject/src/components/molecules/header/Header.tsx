import React from "react"
import Button from "@/components/atoms/buttons/Button"
import type { ButtonVariantType } from "@/domain/types/atomsType"
import type { HeaderVariantType, HeaderSizeType } from "@/domain/types/moleculesType"

type HeaderProps = {
  text?: string // ヘッダーテキスト
  icon: string // アイコンの名前を文字列で指定
  size: HeaderSizeType // mini、small、normal、large のいずれかを指定
  variant: HeaderVariantType // ヘッダーのスタイル header-primary, header-secondary, header-danger, header-warning, header-success のいずれかを指定
  isCircle?: boolean //ヘッダーを角丸にする
  onClick: () => void
}

const Header: React.FC<HeaderProps> = ({
  text,
  size,
  variant,
  icon,
  isCircle,
  onClick,
}: HeaderProps) => {
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
  let circleShape = ""
  let buttonShape = "square"
  if (isCircle === true) {
    circleShape = "rounded-full"
    buttonShape = "circle"
  }

  return (
    <header
      onClick={onClick}
      className={`${headerVariant} ${circleShape} w-full flex items-center justify-between shadow-md shadow-black md:text-2xl text-xl font-bold`}
    >
      <div className={`${headerVariant} ml-6`}>{text}</div>
      <div>
        <Button
          variant={`${buttonVariant}`}
          shape="circle"
          iconLeft={`${icon}`}
          size={`${size}`}
          onClick={onClick}
        />
      </div>
    </header>
  )
}

export default Header
