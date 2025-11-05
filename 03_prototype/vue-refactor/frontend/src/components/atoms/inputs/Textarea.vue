<template>
  <textarea
    :class="textareaClass"
    :placeholder="placeholder"
    :rows="rows"
    :value="value ?? ''"
    @input="onChangeInput"
  />
</template>
<script setup lang="ts">
import type { TextareaShapeType } from "@/domain/types/atomsType"
import { computed } from "vue"

type Props = {
  placeholder?: string
  rows: number
  shape?: TextareaShapeType
  value: string | null
}

const props = withDefaults(defineProps<Props>(), {
  shape: "round",
  isShadow: false,
  isBorder: false,
  value: "",
})

const emit = defineEmits(['on-change-input'])

const shapeStyles: Record<TextareaShapeType, string> = {
  square: "",
  round: "rounded-md",
}

const textareaClass = computed(() => {
  const cornerShape = shapeStyles[props.shape] ?? shapeStyles.round
  const fontSize = "md:text-base text-xs"
  return `w-full text-black p-2 resize-none border border-gray-80 ${cornerShape} ${fontSize}`
})

const onChangeInput = (e: Event) => {
  emit("on-change-input", (e.target as HTMLTextAreaElement).value)
}
</script>
