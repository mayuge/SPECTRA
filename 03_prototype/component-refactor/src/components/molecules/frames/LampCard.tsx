import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import type { SwitchColor } from "@/domain/types/atomsType"

type AccountCardProps = {
  text: string // カードテキスト
  icon: string // アイコン
  variant: SwitchColor // バリアント
}

const AccountCard: React.FC<AccountCardProps> = ({ text, icon, variant }: AccountCardProps) => {
  return (
    <div className={`bg-back flex items-center gap-2`}>
      <hr className={`w-[6px] h-10 border-0 bg-${variant}`} />
      <Button variant="btn-text-gray" size="mini" iconLeft={`${icon}`} />
      <TextLabel text={text} size="normal" bold={false} isBlack={false} />
    </div>
  )
}

export default AccountCard
