//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import Header from "./Header.vue"

const meta = {
  title: "Molecules/Header/Header",
  component: Header,
  tags: ["autodocs"],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
