import { Meta, StoryObj } from "@storybook/react"
import Header from "./Header" // パスはプロジェクト構成に応じて調整してください

const meta: Meta<typeof Header> = {
  title: "Molecules/Header",
  component: Header,
  tags: ["autodocs"], // Autodocs を有効にするためのタグ
  args: {
    text: "Sample Header", // デフォルトのテキスト
    icon: "menu", // アイコン名のデフォルト値
    size: "normal", // デフォルトのサイズ
    variant: "header-primary", // デフォルトのバリアント
    isCircle: false, // デフォルトで角丸なし
  },
  argTypes: {
    text: {
      control: "text",
      description: "ヘッダーテキスト",
    },
    icon: {
      control: "text",
      description: "アイコンの名前を指定",
    },
    size: {
      control: { type: "select" },
      options: ["mini", "small", "normal", "large"], // ユーザーが選べる値
      description: "ヘッダーのサイズ",
    },
    variant: {
      control: { type: "select" },
      options: [
        "header-primary",
        "header-secondary",
        "header-danger",
        "header-warning",
        "header-success",
        "header-dark",
        "header-light",
      ], // バリアント選択肢
      description: "ヘッダーのスタイル",
    },
    isCircle: {
      control: "boolean",
      description: "ヘッダーを角丸にするかどうか",
    },
    onClick: { action: "clicked", description: "クリックイベント" },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}
