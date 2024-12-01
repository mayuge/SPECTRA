import React from "react"
import Button from "@/components/atoms/buttons/Button"
import type { ButtonVariantType } from "@/domain/types/atomsType"
import type { HeaderVariantType } from "@/domain/types/moleculesType"

type HeaderProps = {
  text?: string // ヘッダーテキスト
  icon: string // アイコンの名前を文字列で指定
  size: string // mini、small、normal、large のいずれかを指定
  variant: HeaderVariantType // ヘッダーのスタイル header-primary, header-secondary, header-danger, header-warning, header-success のいずれかを指定
  onClick: () => void
}

const Header: React.FC<HeaderProps> = ({ text, size, variant, icon, onClick }: HeaderProps) => {
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
  }

  return (
    <header className={`${headerVariant}w-full flex items-center justify-between`}>
      <div className={`${headerVariant} ml-4`}>{text}</div>

      <div>
        <Button
          variant={`${buttonVariant}`}
          shape="square"
          icon={`${icon}`}
          size={`${size}`}
          onClick={onClick}
        />
      </div>
    </header>
  )
}

export default Header
