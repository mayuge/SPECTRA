import React from "react"

type InputProps = {
  placeholder: string
  size: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const baseInput: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border p-2 rounded"
    />
  )
}

export default baseInput
