import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import TextLabel from "./TextLabel"

export default {
  title: "atoms/TextLabel", // Storybook上の表示セクション名
  component: TextLabel,
  tags: ["autodocs"], // Storybook 8でのドキュメント自動生成
  argTypes: {
    text: { control: "text", description: "表示するテキスト" },
    size: {
      control: { type: "select" },
      options: ["mini", "small", "normal", "large", "xlarge"],
      description: "フォントサイズを選択",
    },
    bold: {
      control: "boolean",
      description: "文字を太字にするかどうか",
    },
    isBlack: {
      control: "boolean",
      description: "文字色を黒にするかどうか（デフォルトは黒）",
    },
  },
} as Meta

type Story = StoryObj<typeof TextLabel>

export const Mini: Story = {
  args: {
    text: "サンプルテキスト",
    size: "mini",
    bold: false,
    isBlack: true,
  },
}
export const Small: Story = {
  args: {
    text: "サンプルテキスト",
    size: "mini",
    bold: false,
    isBlack: true,
  },
}
export const Normal: Story = {
  args: {
    text: "サンプルテキスト",
    size: "mini",
    bold: false,
    isBlack: true,
  },
}
export const White: Story = {
  args: {
    text: "サンプルテキスト",
    size: "normal",
    bold: false,
    isBlack: false,
  },
}
export const Bold: Story = {
  args: {
    text: "サンプルテキスト",
    size: "normal",
    bold: true,
    isBlack: true,
  },
}

export const Large: Story = {
  args: {
    text: "サンプルテキスト",
    size: "large",
    bold: false,
    isBlack: true,
  },
}
export const XLarge: Story = {
  args: {
    text: "サンプルテキスト",
    size: "xlarge",
    bold: false,
    isBlack: true,
  },
}
