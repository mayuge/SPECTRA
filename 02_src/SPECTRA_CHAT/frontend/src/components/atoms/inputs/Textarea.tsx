import type { TextareaShapeType } from "@/domain/types/atomsType"

type TextareaProps = {
  placeholder?: string
  rows: number
  width?: string
  shape?: TextareaShapeType
  isShadow?: boolean
  value: string | null
  isBorder?: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const shapeStyles: Record<TextareaShapeType, string> = {
  square: "",
  round: "rounded-md",
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  rows,
  shape = "round",
  isShadow = false,
  value,
  isBorder = false,
  onChange,
}) => {
  const cornerShape = shapeStyles[shape] ?? shapeStyles["round"]
  const shadow = isShadow ? "shadow-sm shadow-gray-20" : ""
  const border = isBorder ? "border border-gray-60" : "border-none focus:outline-none"
  const fontSize = "md:text-base text-xs"

  return (
    <textarea
      className={`w-full text-black p-2 ${border} resize-none ${cornerShape} ${shadow} ${fontSize}`}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      rows={rows}
    />
  )
}

export default Textarea
