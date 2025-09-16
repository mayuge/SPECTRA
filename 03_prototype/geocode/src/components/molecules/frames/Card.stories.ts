import React from "react"
import Card from "@/components/molecules/frames/Card"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text", description: "カードのテキスト" },
    isShadow: {
      control: "boolean",
      description: "影の有無",
    },
    shape: {
      control: "select",
      options: ["rounded", "square", "circle"],
      description: "カードの形状",
    },
    isDisplayLayer: {
      control: "boolean",
      description: "表示アイコンの切り替え",
    },
    dangerBadge: { control: "text", description: "危険バッジのテキスト" },
    warningBadge: { control: "text", description: "警告バッジのテキスト" },
    successBadge: { control: "text", description: "成功バッジのテキスト" },
    primaryBadge: { control: "text", description: "主要バッジのテキスト" },
    darkBadge: { control: "text", description: "ダークバッジのテキスト" },
    displayButtonClick: { action: "displayButtonClick", description: "表示ボタンクリック" },
    infoButtonClick: { action: "infoButtonClick", description: "情報ボタンクリック" },
    sliderClick: { action: "sliderClick", description: "スライダー値変更" },
    orderButtonClick: { action: "orderButtonClick", description: "順序ボタンクリック" },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    text: "デフォルトのカード",
    dangerBadge: "危険",
    warningBadge: "警告",
    successBadge: "成功",
    primaryBadge: "主要",
    darkBadge: "ダーク",
    isShadow: false,
    shape: "rounded",
    isDisplayLayer: false,
    displayButtonClick: () => alert("Display button clicked"),
    infoButtonClick: () => alert("Info button clicked"),
    sliderClick: (value) => alert(`Slider value: ${value}`),
    orderButtonClick: () => alert("Order button clicked"),
  },
}

export const ShadowedCard: Story = {
  args: {
    text: "影付きのカード",
    dangerBadge: "データ警告",
    warningBadge: "注意",
    isShadow: true,
    shape: "square",
  },
}

export const CircularCard: Story = {
  args: {
    text: "丸いカード",
    successBadge: "成功",
    isShadow: true,
    shape: "circle",
  },
}

export const DisplayToggleCard: Story = {
  args: {
    text: "表示切り替え可能なカード",
    primaryBadge: "表示切り替え",
    isDisplayLayer: true,
    isShadow: true,
    shape: "rounded",
  },
}

export const NoBadgesCard: Story = {
  args: {
    text: "バッジなしカード",
    isShadow: false,
    shape: "rounded",
  },
}
