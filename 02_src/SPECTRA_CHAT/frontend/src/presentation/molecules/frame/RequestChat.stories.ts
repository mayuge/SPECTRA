//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import RequestChat from "./RequestChat.vue"

const meta = {
  title: "Molecules/Frame/RequestChat",
  component: RequestChat,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    "retry-clicked": { action: "retry-clicked" },
  },
} satisfies Meta<typeof RequestChat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "データ取得リクエストの例: 駅の一覧を見せてください。",
  },
}
