type TextareaProps = {
  placeholder?: string
  rows: number
  width?: string
  shape?: string
  isShadow?: boolean
  value: string | null
  className?: string
  isBorderNone?: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  rows,
  shape,
  isShadow,
  value,
  className,
  isBorderNone,
  onChange,
}) => {
  // 角の形
  let cornerShape = "rounded-md"
  if (shape === "square") {
    cornerShape = ""
  } else if (shape === "rounded-lg") {
    cornerShape = "rounded-lg"
  }

  // 影の有無
  let shadow = ""
  if (isShadow) {
    shadow = "shadow-sm shadow-gray-20"
  }
  let border = "border border-gray-60"
  if (isBorderNone) {
    border = "border-none focus:outline-none"
  }

  // 幅

  let fontSize = "md:text-base text-xs"

  return (
    <textarea
      className={`w-full ${className} text-black p-2 ${border} resize-none ${cornerShape} ${shadow} ${fontSize}`}
      placeholder={placeholder}
      value={value ? value : ""}
      onChange={onChange}
      rows={rows}
    />
  )
}

export default Textarea
