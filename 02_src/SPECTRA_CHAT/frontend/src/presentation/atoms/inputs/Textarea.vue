<template>
  <textarea
    :class="textareaClass"
    :placeholder="placeholder"
    :rows="rows"
    :value="modelValue"
    name="text-input"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import type { TextareaShapeType } from "@/domain/types/atomsType"
import type { PropType } from "vue"
import { computed } from "vue"


const props = defineProps({
  placeholder:{
    type:String as PropType<string>,
    default:"",
    required:false
  },
  rows:{
    type:Number as PropType<number>,
    required:true
  },
  shape:{
    type: String as PropType<TextareaShapeType>,
    default: "round"
  },
  modelValue:{
    type:String as PropType<string>
  }
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
    w-full text-black p-2 resize-none bg-white
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
