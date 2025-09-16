import React from "react"

type ColorInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const BaseColorInput: React.FC<ColorInputProps> = ({ onChange }) => {
  return <input type="color" onChange={onChange} />
}

export default BaseColorInput
