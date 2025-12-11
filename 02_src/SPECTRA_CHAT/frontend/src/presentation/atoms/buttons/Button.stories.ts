//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import Button from "./Button.vue"
import type { ButtonVariantType, ButtonSizeType, ButtonShapeType } from "@/domain/types/atomsType"

const buttonVariants: ButtonVariantType[] = [
  "btn-primary",
  "btn-secondary",
  "btn-danger",
  "btn-warning",
  "btn-success",
  "btn-dark",
  "btn-light",
  "btn-text-black",
  "btn-text-gray",
  "btn-text-white",
]

const buttonSize: ButtonSizeType[] = ["mini", "small", "normal", "large"]

const buttonShape: ButtonShapeType[] = ["square", "circle", "round"]

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: buttonVariants,
    },
    size: {
      control: "select",
      options: buttonSize,
    },
    shape: {
      control: "select",
      options: buttonShape,
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "ボタン",
    size: "normal",
    variant: buttonVariants[0],
  },
}
