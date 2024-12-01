import React from "react"
import Button from "@/components/atoms/buttons/Button"

type HeaderProps = {
  text?: string // ヘッダーテキスト
  icon: string // アイコンの名前を文字列で指定
  size: string // mini、small、normal、large のいずれかを指定
  variant: string // ヘッダーのスタイル header-primary, header-secondary, header-danger, header-warning, header-success のいずれかを指定
  onClick: () => void
}

const Header: React.FC<HeaderProps> = ({ text, size, variant, icon, onClick }: HeaderProps) => {
  // ヘッダーのスタイルの種類 デフォルトは primary
  let headerVariant = "bg-primary text-white"

  if (variant === "header-secondary") {
    headerVariant =
      "bg-white text-primary border-2 border-primary shadow-[inset_0_0_0_2px_var(--primary-color)]" // primary の色を使用、ボーダーの太さも考慮
  } else if (variant === "header-danger") {
    headerVariant = "bg-danger text-white"
  } else if (variant === "header-warning") {
    headerVariant = "bg-warning text-white"
  } else if (variant === "header-success") {
    headerVariant = "bg-success text-white"
  }

  return (
    <header className={`${headerVariant}w-full flex items-center justify-between`}>
      <div>{text}</div>
      <div>
        <Button variant="" shape="square" icon={`${icon}`} size={`${size}`} onClick={onClick} />
      </div>
    </header>
  )
}

export default Header
