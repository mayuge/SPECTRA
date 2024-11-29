import React from 'react';
import Button from '@/components/atoms/buttons/Button';
import type { Meta, StoryObj } from '@storybook/react';

// Meta オブジェクトを作成します
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button', // Storybook のナビゲーションに表示されるタイトル
  component: Button,
  tags: ['autodocs'], // Autodocs を有効にするためのタグ
  args: {
    text: 'Button', // デフォルトのボタンテキスト
    size: 'normal', // デフォルトのサイズ
    variant: 'btn-primary', // デフォルトのスタイル
    shape: 'square', // デフォルトの形状
  },
  argTypes: {
    text: { control: 'text', description: 'ボタンのテキスト' },
    size: {
      control: 'select',
      options: ['mini', 'small', 'normal', 'large'],
      description: 'ボタンのサイズ',
    },
    variant: {
      control: 'select',
      options: [
        'btn-primary',
        'btn-secondary',
        'btn-danger',
        'btn-warning',
        'btn-success',
      ],
      description: 'ボタンのスタイル',
    },
    shape: {
      control: 'select',
      options: ['square', 'circle'],
      description: 'ボタンの形状',
    },
    icon: { control: 'text', description: '表示するアイコンの名前' },
    onClick: { action: 'clicked', description: 'クリックイベントハンドラ' },
  },
};

export default meta;

// Story を定義します
type Story = StoryObj<typeof Button>;

// Primary ボタンのストーリー
export const Primary: Story = {
  args: {
    text: 'Primary Button',
    size: 'normal',
    variant: 'btn-primary',
    shape: 'square',
  },
};

// Secondary ボタンのストーリー
export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    size: 'normal',
    variant: 'btn-secondary',
    shape: 'square',
  },
};

// Icon付きのストーリー
export const WithIcon: Story = {
  args: {
    text: 'With Icon',
    icon: 'check_circle', // マテリアルアイコンの名前
    size: 'normal',
    variant: 'btn-success',
    shape: 'square',
  },
};

// Circle 形状のボタン
export const CircleButton: Story = {
  args: {
    text: 'Circle',
    size: 'normal',
    variant: 'btn-primary',
    shape: 'circle',
  },
};

// Miniサイズのボタン
export const MiniButton: Story = {
  args: {
    text: 'Mini Button',
    size: 'mini',
    variant: 'btn-warning',
    shape: 'square',
  },
};
