import React from "react"
import AccountCard from "@/components/molecules/frames/AccountCard"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof AccountCard> = {
  title: "Molecules/AccountCard",
  component: AccountCard,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text", description: "カードのテキスト" },

    dangerBadge: { control: "text", description: "危険バッジのテキスト" },
    warningBadge: { control: "text", description: "警告バッジのテキスト" },
    successBadge: { control: "text", description: "成功バッジのテキスト" },
    primaryBadge: { control: "text", description: "主要バッジのテキスト" },
    darkBadge: { control: "text", description: "ダークバッジのテキスト" },
    infoButtonClick: { action: "infoButtonClick", description: "情報ボタンクリック" },
  },
}

export default meta

type Story = StoryObj<typeof AccountCard>

export const Default: Story = {
  args: {
    text: "デフォルトのカード",
    dangerBadge: "危険",
    warningBadge: "警告",
    successBadge: "成功",
    primaryBadge: "主要",
    darkBadge: "ダーク",

    infoButtonClick: () => alert("Info button clicked"),
  },
}

export const DisplayToggleAccountCard: Story = {
  args: {
    text: "表示切り替え可能なカード",
    primaryBadge: "表示切り替え",
  },
}

export const NoBadgesAccountCard: Story = {
  args: {
    text: "バッジなしカード",
  },
}
