<template>
  <button
    :class="[
      paddingClasses,
      variantClasses,
      shapeClasses,
      shadowClass,
      'flex items-center justify-center'
    ]"
    @click="onClick"
  >
    <span v-if="icon" class="material-icons">{{ icon }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue"

type PullTabPositionType = "left" | "right" | "top" | "bottom"
type PullTabSizeType = "mini" | "small" | "normal" | "large"
type PullTabVariantType =
  | "pullTab-primary"
  | "pullTab-secondary"
  | "pullTab-danger"
  | "pullTab-warning"
  | "pullTab-success"
  | "pullTab-dark"
  | "pullTab-light"

interface Props {
  position: PullTabPositionType
  icon?: string
  isShadow?: boolean
  size?: PullTabSizeType
  variant?: PullTabVariantType
  onClick?: () => void
}

const props = defineProps<Props>()

// --- 各スタイル定義 ---
const variantStyles: Record<PullTabVariantType, string> = {
  "pullTab-primary": "bg-primary text-white hover:bg-primaryDark",
  "pullTab-secondary":
    "bg-white text-primary border-2 border-primary shadow-[inset_0_0_0_2px_var(--color-primary)]",
  "pullTab-danger": "bg-danger text-white",
  "pullTab-warning": "bg-warning text-white",
  "pullTab-success": "bg-success text-white",
  "pullTab-dark": "bg-gray-20 text-white",
  "pullTab-light": "bg-white text-gray-20",
}

const paddingSize: Record<PullTabSizeType, string> = {
  mini: "p-0",
  small: "p-2",
  normal: "p-4",
  large: "p-6",
}

const positionShape: Record<PullTabPositionType, string> = {
  left: "rounded-r-lg py-2",
  right: "rounded-l-lg py-2",
  top: "rounded-b-lg px-2",
  bottom: "rounded-t-lg px-2",
}

// --- computed で動的クラスを構築 ---
const variantClasses = computed(() => variantStyles[props.variant ?? "pullTab-primary"])
const paddingClasses = computed(() => paddingSize[props.size ?? "normal"])
const shapeClasses = computed(() => positionShape[props.position])
const shadowClass = computed(() => (props.isShadow ? "shadow-sm shadow-black" : ""))
</script>
