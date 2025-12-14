//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import ChatSuggestGroup from "./ChatSuggestGroup.vue"
import type { SuggestType } from "@/domain/types/suggestType"
import { CHAT_SUGGEST_LIST } from "@/domain/params/chatSuggest"

const meta = {
  title: "Molecules/Group/ChatSuggestGroup",
  component: ChatSuggestGroup,
  tags: ["autodocs"],
  argTypes: {
    "badge-clicked": { action: "badge-clicked" },
  },
} satisfies Meta<typeof ChatSuggestGroup>

export default meta
type Story = StoryObj<typeof meta>

const sampleList: SuggestType[] = CHAT_SUGGEST_LIST
export const Default: Story = {
  args: {
    suggestList: sampleList,
  },
}

export const Empty: Story = {
  args: {
    suggestList: [],
  },
}
