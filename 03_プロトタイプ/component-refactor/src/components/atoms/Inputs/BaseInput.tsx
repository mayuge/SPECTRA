import React from "react"

type InputProps = {
  placeholder: string
  size: string
  text: string
  shape: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const BaseInput: React.FC<InputProps> = ({ placeholder, text, size, shape, onChange }) => {
  //入力欄の形状を設定
  let inputShape = "rounded"
  if (shape === "circle") {
    inputShape = "rounded-full"
  } else if (shape === "square") {
    inputShape = ""
  }
  //入力欄のサイズを設定
  let inputSize = "w-48"
  if (size === "small") {
    inputSize = "w-32"
  } else if (size === "large") {
    inputSize = "w-64"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }
  return (
    <input
      className={`${inputShape}${inputSize}`}
      type="text"
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
    />
  )
}

export default BaseInput
