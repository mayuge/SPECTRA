//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import Textarea from "./Textarea.vue"

const shapes = ["round", "square"] as const

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    rows: { control: { type: "number", min: 1, max: 20, step: 1 } },
    shape: {
      control: "select",
      options: shapes,
    },
    "update:modelValue": { action: "update:modelValue" },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "メッセージを入力してください",
    rows: 3,
    shape: "round",
    modelValue: "",
  },
}

export const WithValue: Story = {
  args: {
    placeholder: "編集できます",
    rows: 4,
    shape: "round",
    modelValue: "初期値のテキストです。",
  },
}

export const SquareShape: Story = {
  args: {
    placeholder: "角丸なし",
    rows: 3,
    shape: "square",
    modelValue: "",
  },
}
