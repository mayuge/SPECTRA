<template>
  <button
    :class="[
      paddingClasses,
      variantClasses,
      shapeClasses,
      shadowClass,
      'flex items-center gap-1 text-xs md:text-base'
    ]"
    @click="buttonClicked"
  >
    <span v-if="props.iconLeft" class="material-icons">{{ props.iconLeft }}</span>
    <img v-if="props.path" :src="props.path" alt="Image" class="w-8 h-8 md:w-7 md:h-7" />
    <span v-if="props.text" :style="{ position: 'relative', top: '-1px' }">{{ props.text }}</span>
    <span v-if="props.iconRight" class="material-icons">{{ props.iconRight }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { PropType } from "vue"
import type { ButtonVariantType, ButtonShapeType, ButtonSizeType } from "@/domain/types/atomsType"

const props = defineProps({
  variant: {
    type: String as PropType<ButtonVariantType>,
    required: true,
    default: "btn-primary",
  },
  size: {
    type: String as PropType<ButtonSizeType>,
    required: true,
    default: "normal",
  },
  shape: {
    type: String as PropType<ButtonShapeType>,
    default: "round",
  },
  text: {
    type: String as PropType<string>,
    default: "",
  },
  iconLeft: {
    type: String as PropType<string>,
    default: "",
  },
  iconRight: {
    type: String as PropType<string>,
    default: "",
  },
  isShadow: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  path: {
    type: String as PropType<string>,
    default: "",
  },
})

const emit = defineEmits(["button-clicked"])
const buttonClicked = () => emit("button-clicked")

const variantStyles: Record<ButtonVariantType, string> = {
  "btn-primary": "bg-primary text-white hover:bg-primaryDark",
  "btn-secondary": "bg-secondary text-black",
  "btn-danger": "bg-danger text-white",
  "btn-warning": "bg-warning text-white",
  "btn-success": "bg-success text-white",
  "btn-dark": "bg-gray-20 text-white",
  "btn-light": "bg-white text-gray-20",
  "btn-text-black": "text-gray-20",
  "btn-text-gray": "text-gray-50",
  "btn-text-white": "text-white",
}

const shapeStyles: Record<ButtonShapeType, string> = {
  round: "rounded",
  square: "",
  circle: "rounded-full",
}

const paddingSize: Record<ButtonSizeType, string> = {
  mini: "p-0",
  small: "p-1",
  normal: "p-2",
  large: "p-3",
}

const variantClasses = computed(() => variantStyles[props.variant ?? "btn-primary"])
const shapeClasses = computed(() => shapeStyles[props.shape ?? "round"])
const paddingClasses = computed(() => paddingSize[props.size ?? "normal"])
const shadowClass = computed(() => (props.isShadow ? "shadow-md shadow-black" : ""))
</script>
