//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import Color from "./Color.vue"

const meta = {
  title: "Atoms/Color",
  component: Color,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "color" },
  },
} satisfies Meta<typeof Color>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "#000000",
  },
}

export const Red: Story = {
  args: {
    value: "#ff0000",
  },
}

export const Blue: Story = {
  args: {
    value: "#0000ff",
  },
}
