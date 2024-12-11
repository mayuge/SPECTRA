import React from "react";
import Card from "@/components/molecules/frames/Card";
import type { Meta, StoryObj } from "@storybook/react";

// Meta オブジェクトを作成します
const meta: Meta<typeof Card> = {
  title: "Molecules/Card", // Storybook のナビゲーションに表示されるタイトル
  component: Card,
  tags: ["autodocs"],
  args: {
    text: "カードテキスト",
    isShadow: false,
    shape: "rounded", // デフォルトでは角丸
    isDisplayLayer: false,
    displayButtonClick: () => {},
    refreshButtonClick: () => {},
  },
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
    refreshButtonClick: { action: "refreshButtonClick", description: "更新ボタンクリック" },
  },
};

export default meta;

// Story を定義します
type Story = StoryObj<typeof Card>;

// デフォルトのカード
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
  },
};

// シャドウ付きカード
export const ShadowedCard: Story = {
  args: {
    text: "影付きのカード",
    dangerBadge: "データ警告",
    warningBadge: "注意",
    isShadow: true,
    shape: "square",
  },
};

// 丸いカード
export const CircularCard: Story = {
  args: {
    text: "丸いカード",
    successBadge: "成功",
    isShadow: true,
    shape: "circle",
  },
};

// 表示切り替えアイコン付きカード
export const DisplayToggleCard: Story = {
  args: {
    text: "表示切り替え可能なカード",
    primaryBadge: "表示切り替え",
    isDisplayLayer: true,
    isShadow: true,
    shape: "rounded",
  },
};

// バッジなしカード
export const NoBadgesCard: Story = {
  args: {
    text: "バッジなしカード",
    isShadow: false,
    shape: "rounded",
  },
};
