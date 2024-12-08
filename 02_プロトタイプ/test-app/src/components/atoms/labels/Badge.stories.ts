// src/components/atoms/Badge.stories.tsx
import { Meta, StoryObj } from "@storybook/react"
import Badge from "./Badge"

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"], // Storybook 8でのドキュメント自動生成
  argTypes: {
    text: {
      control: { type: "text" },
      description: "バッジに表示されるテキスト",
      defaultValue: "Badge",
    },
    shape: {
      control: { type: "select" },
      options: ["square", "circle", null],
      description: "バッジの形状を指定します (square または circle)",
      defaultValue: "square",
    },
    variant: {
      control: { type: "select" },
      options: [
        "badge-primary",
        "badge-secondary",
        "badge-danger",
        "badge-warning",
        "badge-success",
        "badge-dark",
      ],
      description: "バッジのスタイルを指定します",
      defaultValue: "badge-primary",
    },
  },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: {
    text: "Primary Badge",
    variant: "badge-primary",
  },
}

export const Secondary: Story = {
  args: {
    text: "Secondary Badge",
    variant: "badge-secondary",
    shape: "circle",
  },
}

export const Danger: Story = {
  args: {
    text: "必須",
    variant: "badge-danger",
    shape: "circle",
  },
}

export const Warning: Story = {
  args: {
    text: "電車遅延",
    variant: "badge-warning",
    shape: "square",
  },
}

export const Success: Story = {
  args: {
    text: "認証済み",
    variant: "badge-success",
    shape: "circle",
  },
}

export const Pointer: Story = {
  args: {
    text: "",
    variant: "badge-danger",
    shape: "circle",
  },
}
