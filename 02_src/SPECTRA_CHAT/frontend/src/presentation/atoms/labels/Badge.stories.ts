//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import Badge from "./Badge.vue"
import type { BadgeVariantType, BadgeShapeType } from "@/domain/types/atomsType"

const badgeVariants: BadgeVariantType[] = [
  "badge-primary",
  "badge-secondary",
  "badge-danger",
  "badge-warning",
  "badge-success",
  "badge-dark",
]

const badgeShapes: BadgeShapeType[] = ["square", "round", "circle"]

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: badgeVariants,
    },
    shape: {
      control: "select",
      options: badgeShapes,
    },
    text: {
      control: "text",
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "バッジ",
    variant: badgeVariants[0],
    shape: badgeShapes[0],
  },
}
