//@ts-ignore
import type { Meta, StoryObj } from "@storybook/vue3"
import ConceptDisplay from "./ConceptDisplay.vue"

const meta = {
  title: "Molecules/Display/ConceptDisplay",
  component: ConceptDisplay,
  tags: ["autodocs"],
} satisfies Meta<typeof ConceptDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}