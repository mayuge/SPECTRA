//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import ImageButton from "./ImageButton.vue"
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

const buttonSizes: ButtonSizeType[] = ["mini", "small", "normal", "large"]

const buttonShapes: ButtonShapeType[] = ["square", "circle", "round"]

const meta = {
  title: "Atoms/ImageButton",
  component: ImageButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: buttonVariants,
    },
    size: {
      control: "select",
      options: buttonSizes,
    },
    shape: {
      control: "select",
      options: buttonShapes,
    },
    text: {
      control: "text",
    },
    path: {
      control: "text",
    },
    iconLeft: {
      control: "text",
    },
    iconRight: {
      control: "text",
    },
    isShadow: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ImageButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "イメージボタン",
    path: "/assets/sample-icon.png",
    size: "normal",
    variant: buttonVariants[0],
    shape: "round",
    iconLeft: "",
    iconRight: "",
    isShadow: false,
  },
}
