import React from "react"
import BaseInput from "@/components/atoms/Inputs/BaseInput"
import Button from "@/components/atoms/buttons/Button"
import type { ButtonVariantType } from "@/domain/types/atomsType"

type InputProps = {
  placeholder: string
  size: string
  text?: string
  shape?: "square" | "circle"
  isStretch: boolean
  isBlack?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

const SearchInput: React.FC<InputProps> = ({
  placeholder,
  text,
  size,
  shape,
  isStretch,
  isBlack,
  onChange,
  onClick,
}) => {
  let inputBlack = "bg-white"
  let buttonBlack: ButtonVariantType = "btn-text-gray"
  if (isBlack) {
    inputBlack = "text-white bg-gray-20"
    buttonBlack = "btn-text-white"
  }
  let inputStretch = ""
  if (isStretch) {
    inputStretch = "w-full"
  }
  return (
    <div className={`${inputBlack} ${inputStretch} flex items-center`}>
      <BaseInput
        placeholder={placeholder}
        text={text}
        size={size}
        shape={shape}
        isStretch={isStretch}
        isBlack={isBlack}
        onChange={onChange}
      />
      <Button
        variant={`${buttonBlack}`}
        size="small"
        iconLeft="search"
        shape={shape}
        onClick={onClick}
      />
    </div>
  )
}

export default SearchInput
