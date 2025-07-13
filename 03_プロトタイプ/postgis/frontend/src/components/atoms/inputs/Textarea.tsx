type TextareaProps = {
  placeholder?: string
  rows: number
  width?: string
  shape?: string
  isShadow?: boolean
  value: string | null
  className?: string
  isBorderNone?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  rows,
  width,
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
  let border = "border border-black"
  if (isBorderNone) {
    border = "border-none focus:outline-none"
  }

  // 幅
  const textareaWidth = width ? width : "w-full"
  let fontSize = "md:text-base text-xs"

  return (
    <div className="relative">
      <textarea
        className={`${textareaWidth} ${className} p-2 ${border} resize-none ${cornerShape} ${shadow} ${fontSize}`}
        placeholder={placeholder}
        value={value ? value : ""}
        onChange={onChange}
        rows={rows}
      />
    </div>
  )
}

export default Textarea
