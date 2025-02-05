import React from "react"
import Badge from "@/components/atoms/labels/Badge"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"

type AccountCardProps = {
  text: string // カードテキスト
  logoImg: string // ロゴ画像のパス
  infoButtonClick: () => void
  dangerBadge?: string
  warningBadge?: string
  successBadge?: string
  primaryBadge?: string
  darkBadge?: string
}

const AccountCard: React.FC<AccountCardProps> = ({
  text,
  logoImg,
  dangerBadge,
  warningBadge,
  successBadge,
  primaryBadge,
  darkBadge,
  infoButtonClick,
}: AccountCardProps) => {
  // ロゴ画像のパス
  let logoImgPath = "/assets/logos/default.webp"
  if (logoImg) {
    logoImgPath = logoImg
  }

  return (
    <div className={`bg-back hover:bg-gray-20 p-2`}>
      <img src={logoImgPath} className="w-full h-[250px] rounded-lg" />
      <div className="flex items-center gap-1 py-2">
        {dangerBadge && <Badge variant="badge-danger" text={dangerBadge} />}
        {warningBadge && <Badge variant="badge-warning" text={warningBadge} />}
        {successBadge && <Badge variant="badge-success" text={successBadge} />}
        {primaryBadge && <Badge variant="badge-primary" text={primaryBadge} />}
        {darkBadge && <Badge variant="badge-dark" text={darkBadge} />}
      </div>
      <div className="inline-flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="btn-text-gray" size="mini" iconLeft="groups" onClick={infoButtonClick} />
          <TextLabel text={text} size="normal" bold={false} isBlack={false} />
        </div>
        <Button
          variant="btn-text-gray"
          size="mini"
          iconLeft="more_horiz"
          onClick={infoButtonClick}
        />
      </div>

      <hr className="border-gray-50" />
    </div>
  )
}

export default AccountCard
