import React from "react"

type InputProps = {
  placeholder: string
  size: string
  text?: string
  shape?: "square" | "circle"
  isStretch: boolean
  isBlack?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const BaseInput: React.FC<InputProps> = ({
  placeholder,
  text,
  size,
  shape,
  isStretch,
  isBlack,
  onChange,
}) => {
  //入力欄の形状を設定
  let inputShape = "rounded"
  if (shape === "circle") {
    inputShape = "rounded-full"
  } else if (shape === "square") {
    inputShape = ""
  }
  //入力欄のサイズを設定
  let inputSize = "h-10"
  if (size === "small") {
    inputSize = "h-8"
  } else if (size === "large") {
    inputSize = "h-12"
  }
  let inputStretch = ""
  //入力欄のサイズを設定
  if (isStretch) {
    inputStretch = "w-full"
  }

  let inputBlack = ""
  if (isBlack) {
    inputBlack = "text-white bg-gray-20"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  return (
    <input
      className={`${inputShape} ${inputSize} ${inputStretch} ${inputBlack} pl-2`}
      type="text"
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
    />
  )
}

export default BaseInput
