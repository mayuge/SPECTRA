import React from "react"

type SliderInputProps = {
  value?: number // スライダーの現在の値
  min?: number // 最小値（デフォルトは0）
  max?: number // 最大値（デフォルトは100）
  step?: number // ステップ値（デフォルトは1）
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // 値変更時のハンドラー
}

const BaseSliderInput: React.FC<SliderInputProps> = ({
  value,
  min = 0,
  max = 1.0,
  step = 0.1,
  onChange,
}) => {
  return (
    <div className="max-w-[400px] min-w-[300px]">
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="w-full  bg-gray-30 h-2 rounded-lg cursor-pointer"
        aria-label="Slider input"
      />
    </div>
  )
}

export default BaseSliderInput
