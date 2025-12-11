//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import PullTab from "./PullTab.vue"

import type {
  PullTabPositionType,
  PullTabSizeType,
  PullTabVariantType,
} from "@/domain/types/atomsType"

const pullTabVariants: PullTabVariantType[] = [
  "pullTab-primary",
  "pullTab-secondary",
  "pullTab-danger",
  "pullTab-warning",
  "pullTab-success",
  "pullTab-dark",
  "pullTab-light",
]

const pullTabSizes: PullTabSizeType[] = ["mini", "small", "normal", "large"]

const pullTabPositions: PullTabPositionType[] = ["left", "right", "top", "bottom"]

const meta = {
  title: "Atoms/PullTab",
  component: PullTab,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: pullTabVariants,
    },
    size: {
      control: "select",
      options: pullTabSizes,
    },
    position: {
      control: "select",
      options: pullTabPositions,
    },
    icon: {
      control: "text",
    },
    isShadow: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof PullTab>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    position: "left",
    icon: "chevron_left",
    size: "mini",
    variant: pullTabVariants[5],
    isShadow: false,
  },
}
