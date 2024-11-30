import React from "react"

type HeaderProps = {
  text?: string // バーテキスト
  icon?: string
  size: string // small、normal、large のいずれかを指定
  variant: string // バーのスタイル header-primary, header-secondary, header-danger, header-warning, header-success のいずれかを指定
}

const Header: React.FC<HeaderProps> = ({ text, size, variant, icon }: HeaderProps) => {
  // サイズの種類　small normal largeから指定 paddingSize を動的に設定
  let paddingSize = "y-4" // デフォルトの padding
  if (size === "small") {
    paddingSize = "y-2" // small サイズの padding
  } else if (size === "large") {
    paddingSize = "y-6" // large サイズの padding
  }

  // バーのスタイルの種類 デフォルトは primary
  let headerVariant = "bg-primary text-white hover:bg-primaryDark"

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
    <header
      className={`${paddingSize} ${headerVariant} flex items-center items-between`} // flex と items-center を追加
    >
      {text}
      {icon && <span className="material-icons">{icon}</span>} {/* アイコンを表示*/}
    </header>
  )
}

export default Header
