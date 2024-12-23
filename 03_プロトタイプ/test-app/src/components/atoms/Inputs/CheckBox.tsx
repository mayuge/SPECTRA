import React from "react"

type InputProps = {
  value: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CheckBox: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={value} // 初期値として親コンポーネントから渡されたvalueを設定
      onChange={onChange}
      className="border-primary primary w-6 h-6"
    />
  )
}

export default CheckBox
