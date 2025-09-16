import type { Meta, StoryObj } from "@storybook/react"
import HomeSite from "./HomeSiteMain"

const meta: Meta<typeof HomeSite> = {
  title: "Organisms/HomeSite",
  component: HomeSite,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

// ストーリーの定義
export const Default: Story = {
  name: "デフォルト表示",
}
