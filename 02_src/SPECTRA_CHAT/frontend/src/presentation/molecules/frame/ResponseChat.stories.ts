//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import ResponseChat from "./ResponseChat.vue"

const meta = {
  title: "Molecules/Frame/ResponseChat",
  component: ResponseChat,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    responseId: { control: { type: "number", min: 0 } },
    layerColor: { control: "color" },
    "toggle-clicked": { action: "toggle-clicked" },
    "back-to-clicked": { action: "back-to-clicked" },
    "front-to-clicked": { action: "front-to-clicked" },
    "on-slider-input": { action: "on-slider-input" },
    "on-color-input": { action: "on-color-input" },
  },
} satisfies Meta<typeof ResponseChat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "レスポンス例: 指定地域の鉄道データを地図に表示しました。",
    responseId: 1,
    layerColor: "#808080",
  },
}
