import React from "react"
import Button from "@/components/atoms/buttons/Button"
import type { Meta, StoryObj } from "@storybook/react"

// Meta オブジェクトを作成します
const meta: Meta<typeof Button> = {
  title: "Atoms/Button", // Storybook のナビゲーションに表示されるタイトル
  component: Button,
  tags: ["autodocs"], // Autodocs を有効にするためのタグ
  args: {
    text: "Button", // デフォルトのボタンテキスト
    size: "normal", // デフォルトのサイズ
    variant: "btn-primary", // デフォルトのスタイル
    shape: undefined, // デフォルトで指定しない状態
  },
  argTypes: {
    text: { control: "text", description: "ボタンのテキスト" },
    size: {
      control: "select",
      options: ["mini", "small", "normal", "large"],
      description: "ボタンのサイズ",
    },
    variant: {
      control: "select",
      options: [
        "btn-primary",
        "btn-secondary",
        "btn-danger",
        "btn-warning",
        "btn-success",
        "btn-dark",
        "btn-light",
        "btn-text-black",
        "btn-text-gray",
        "btn-text-white",
      ],
      description: "ボタンのスタイル",
    },
    shape: {
      control: "select",
      options: [null, "square", "circle"], // 指定しない場合はnull
      description: "ボタンの形状",
      mapping: {
        null: undefined, // null を指定しない場合にマップ
      },
    },
    iconLeft: { control: "text", description: "表示するアイコンの名前" },
    iconRight: { control: "text", description: "表示するアイコンの名前" },
    onClick: { action: "clicked", description: "クリックイベントハンドラ" },
  },
}

export default meta

// Story を定義します
type Story = StoryObj<typeof Button>

// Primary ボタンのストーリー
export const Primary: Story = {
  args: {
    text: "登録する",
    size: "normal",
    variant: "btn-primary",
  },
}

// Secondary ボタンのストーリー
export const Secondary: Story = {
  args: {
    text: "キャンセル",
    size: "normal",
    variant: "btn-secondary",
  },
}

// Success ボタンのストーリー　四角形
export const Success: Story = {
  args: {
    text: "認証",
    iconRight: "check_circle", // マテリアルアイコンの名前
    size: "normal",
    variant: "btn-success",
    shape: "square",
  },
}

// Icon付きのストーリー
export const Danger: Story = {
  args: {
    text: "削除する",
    iconLeft: "delete", // マテリアルアイコンの名前
    size: "small",
    variant: "btn-danger",
    shape: "circle",
  },
}
export const Dark: Story = {
  args: {
    text: "トップへ戻る",
    iconRight: "arrow_forward", // マテリアルアイコンの名前
    size: "normal",
    variant: "btn-dark",
    shape: "circle",
  },
}
export const Light: Story = {
  args: {
    text: "トップへ戻る",
    iconRight: "arrow_forward", // マテリアルアイコンの名前
    size: "normal",
    variant: "btn-light",
    isShadow: true,
    shape: "circle",
  },
}

// Circle 形状のボタン
export const Circle: Story = {
  args: {
    text: "",
    iconLeft: "add",
    size: "large",
    variant: "btn-warning",
    shape: "circle",
  },
}

// Miniサイズのボタン
export const Mini: Story = {
  args: {
    text: "",
    iconLeft: "close",
    size: "mini",
    variant: "btn-danger",
    shape: "square",
  },
}

// アイコンボタン
export const TextIconButton: Story = {
  args: {
    text: "",
    iconLeft: "close",
    size: "mini",
    variant: "btn-text-gray",
    shape: "square",
  },
}
// テキストボタン
export const TextButton: Story = {
  args: {
    text: "このテキストは押すことができます",
    size: "mini",
    variant: "btn-text-black",
    shape: "square",
  },
}
