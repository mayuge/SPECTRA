import type { Meta, StoryObj } from "@storybook/react"
import Header from "./Header"
import type { HeaderVariantType } from "@/domain/types/moleculesType"

// メタ情報の設定
const meta: Meta<typeof Header> = {
  title: "Molecules/Header", // カテゴリ
  component: Header,
  tags: ["autodocs"], // 自動ドキュメント化
  argTypes: {
    text: { control: "text" },
    icon: { control: "text" },
    size: {
      control: { type: "select" },
      options: ["mini", "small", "normal", "large"],
    },
    variant: {
      control: { type: "select" },
      options: [
        "header-primary",
        "header-secondary",
        "header-danger",
        "header-warning",
        "header-success",
      ],
    },
    onClick: { action: "clicked" }, // アクションロガー
  },
}

export default meta
type Story = StoryObj<typeof Header>

// Primary バージョン
export const Primary: Story = {
  args: {
    text: "Primary Header",
    icon: "menu",
    size: "normal",
    variant: "header-primary",
  },
}

// Secondary バージョン
export const Secondary: Story = {
  args: {
    text: "Secondary Header",
    icon: "settings",
    size: "normal",
    variant: "header-secondary",
  },
}

// Danger バージョン
export const Danger: Story = {
  args: {
    text: "Danger Header",
    icon: "warning",
    size: "normal",
    variant: "header-danger",
  },
}

// Warning バージョン
export const Warning: Story = {
  args: {
    text: "Warning Header",
    icon: "exclamation",
    size: "normal",
    variant: "header-warning",
  },
}

// Success バージョン
export const Success: Story = {
  args: {
    text: "Success Header",
    icon: "check",
    size: "normal",
    variant: "header-success",
  },
}
