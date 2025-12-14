//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import ErrorChat from "./ErrorChat.vue"

const meta = {
  title: "Molecules/Frame/ErrorChat",
  component: ErrorChat,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
  },
} satisfies Meta<typeof ErrorChat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "エラーが発生しました。再度お試しください。",
  },
}
