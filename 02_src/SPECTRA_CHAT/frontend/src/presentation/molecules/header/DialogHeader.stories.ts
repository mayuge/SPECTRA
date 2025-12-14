//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import DialogHeader from "./DialogHeader.vue"

const variants = [
  "header-primary",
  "header-secondary",
  "header-danger",
  "header-warning",
  "header-success",
  "header-dark",
  "header-light",
] as const

const sizes = ["mini", "small", "normal", "large"] as const

const shapes = ["", "circle", "square"] as const // "" はデフォルト（rounded-t-lg 相当）

const meta = {
  title: "Molecules/Header/DialogHeader",
  component: DialogHeader,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    variant: { control: "select", options: variants },
    size: { control: "select", options: sizes },
    shape: { control: "select", options: shapes },
    isPullIcon: { control: "boolean" },
    isShadow: { control: "boolean" },
    "header-clicked": { action: "header-clicked" },
  },
} satisfies Meta<typeof DialogHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "ダイアログヘッダー",
    variant: "header-primary",
    size: "normal",
    shape: "",
    isPullIcon: false,
    isShadow: false,
  },
}

export const WithPullIcon: Story = {
  args: {
    text: "プルアイコン付きヘッダー",
    variant: "header-secondary",
    size: "normal",
    shape: "",
    isPullIcon: true,
    isShadow: false,
  },
}

export const Shadowed: Story = {
  args: {
    text: "影付きヘッダー",
    variant: "header-primary",
    size: "normal",
    shape: "circle",
    isPullIcon: false,
    isShadow: true,
  },
}
