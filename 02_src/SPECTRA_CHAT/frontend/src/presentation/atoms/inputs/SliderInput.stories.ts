//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import SliderInput from "./SliderInput.vue"

const meta = {
  title: "Atoms/SliderInput",
  component: SliderInput,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    "on-change-input": { action: "on-change-input" },
  },
} satisfies Meta<typeof SliderInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 0.5,
  },
}

export const Min: Story = {
  args: {
    value: 0,
  },
}

export const Max: Story = {
  args: {
    value: 1,
  },
}