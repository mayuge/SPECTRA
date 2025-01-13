import React from "react"
import TextLabel from "@/components/atoms/labels/TextLabel"

type LegendCardProps = {
  color: string // 背景色（任意のカラーコード）
  text: string // カードテキスト
  isShadow: boolean // 影の有無
  shape?: string // カードの形状を文字列で指定 square(四角形) circle（丸）デフォルトで角丸
}

const LegendCard: React.FC<LegendCardProps> = ({
  color,
  text,
  shape,
  isShadow,
}: LegendCardProps) => {
  // カードの形状
  let cornerShape = "rounded-lg"
  if (shape === "square") {
    cornerShape = "" // 四角形の場合は角丸を指定しない
  } else if (shape === "round") {
    cornerShape = "rounded-full" // 円形の角
  }

  // 影の有無
  const buttonShadow = isShadow ? "shadow-md shadow-black" : ""

  return (
    <div className={`bg-white ${cornerShape} ${buttonShadow} px-2 hover:bg-gray-90`}>
      <div className="flex items-center w-full">
        <div className="w-full">
          <div className="p-1 flex items-center gap-2">
            {/* インラインスタイルで背景色を設定 */}
            <div
              className="h-6 w-12 border border-gray-50"
              style={{ backgroundColor: color }}
            ></div>
            <div className="inline-flex items-center gap-4 text-black">
              <TextLabel text={text} size="normal" bold={false} />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-70" />
    </div>
  )
}

export default LegendCard
