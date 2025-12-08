<template>
  <textarea
    :class="textareaClass"
    :placeholder="placeholder"
    :rows="rows"
    :value="modelValue"
    name="chat-input"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import type { TextareaShapeType } from "@/domain/types/atomsType"
import { computed } from "vue"

type Props = {
  placeholder?: string
  rows: number
  shape?: TextareaShapeType
  modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
  shape: "round",
})

const emit = defineEmits(["update:modelValue"])

// 角丸スタイル
const shapeStyles: Record<TextareaShapeType, string> = {
  square: "",
  round: "rounded-md",
}

// Tailwind クラス
const textareaClass = computed(() => {
  const cornerShape = shapeStyles[props.shape] ?? shapeStyles.round
  return `
    w-full text-black p-2 resize-none
    border border-gray-80
    placeholder:text-sm placeholder:text-gray-70
    focus:!border-secondary focus:!ring-4 focus:!ring-secondary
    ${cornerShape} text-base
  `
})

// input で update:modelValue を emit
const onInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLTextAreaElement).value)
}
</script>
