import React from "react"

type SliderInputProps = {
  value?: number // 外部で管理する現在の値
  min?: number // 最小値（デフォルトは0）
  max?: number // 最大値（デフォルトは1.0）
  step?: number // ステップ値（デフォルトは0.1）
  onChange: (value: number) => void // 値変更時のコールバック
}

const BaseSliderInput: React.FC<SliderInputProps> = ({
  value,
  min = 0,
  max = 1.0,
  step = 0.1,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    onChange(newValue) // 値を親に通知
  }

  return (
    <div className="md:w-[350px] w-[200px]">
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className="w-full bg-gray-30 h-2 rounded-lg cursor-pointer"
        aria-label="Slider input"
      />
    </div>
  )
}

export default BaseSliderInput
