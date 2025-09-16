import PullTab from "@/components/atoms/buttons/PullTab"
import type { Meta, StoryObj } from "@storybook/react"

// Meta オブジェクトを作成します
const meta: Meta<typeof PullTab> = {
  title: "Atoms/PullTab", // Storybook のナビゲーションに表示されるタイトル
  component: PullTab, // コンポーネントの参照
  tags: ["autodocs"], // Autodocs を有効にするためのタグ
  args: {
    size: "normal", // デフォルトのサイズ
    variant: "pullTab-primary", // デフォルトのスタイル
    position: "bottom", // デフォルトの位置
    isShadow: false, // デフォルトでは影をつけない
    onClick: () => {}, // デフォルトのクリックハンドラ
  },
  argTypes: {
    position: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "プルタブの位置",
    },
    size: {
      control: "select",
      options: ["mini", "small", "normal", "large"],
      description: "プルタブのサイズ",
    },
    variant: {
      control: "select",
      options: [
        "pullTab-primary",
        "pullTab-secondary",
        "pullTab-danger",
        "pullTab-warning",
        "pullTab-success",
        "pullTab-dark",
        "pullTab-light",
      ],
      description: "プルタブのスタイル",
    },

    icon: { control: "text", description: "表示するアイコンの名前" },
    isShadow: {
      control: "boolean",
      description: "影をつけるかどうか",
    },
    onClick: { action: "clicked", description: "クリックイベントハンドラ" },
  },
}

export default meta

// Story を定義します
type Story = StoryObj<typeof PullTab>

// Primary ボタンのストーリー
export const Primary: Story = {
  args: {
    size: "normal",
    variant: "pullTab-primary",
    position: "bottom",
    icon: "arrow_drop_up", // マテリアルアイコンの名前
    isShadow: true, // 影をつける
  },
}

export const Gray: Story = {
  args: {
    size: "mini",
    variant: "pullTab-light",
    position: "left",
    icon: "arrow_right", // マテリアルアイコンの名前
    isShadow: true, // 影をつける
  },
}
