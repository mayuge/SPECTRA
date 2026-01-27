<template>
  <button
    :class="[
      paddingClasses,
      variantClasses,
      shapeClasses,
      shadowClass,
      'flex items-center justify-center hover:brightness-90 cursor-pointer'
    ]"
    @click="buttonClicked"
  >
    <span v-if="icon" class="material-icons">{{ icon }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import type { PropType } from "vue"
import type {
  PullTabPositionType,
  PullTabSizeType,
  PullTabVariantType,
} from "@/domain/types/atomsType"

const props = defineProps({
  position: {
    type: String as PropType<PullTabPositionType>,
    required: true,
  },
  icon: {
    type: String as PropType<string>,
    default: "",
  },
  isShadow: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  size: {
    type: String as PropType<PullTabSizeType>,
    default: "normal",
  },
  variant: {
    type: String as PropType<PullTabVariantType>,
    default: "pullTab-primary",
  },
})

const emit = defineEmits(["button-clicked"])
const buttonClicked = () => {
  emit("button-clicked")
}

const variantStyles: Record<PullTabVariantType, string> = {
  "pullTab-primary": "bg-primary text-white hover:bg-primaryDark",
  "pullTab-secondary": "bg-secondary text-white",
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

const variantClasses = computed(() => variantStyles[props.variant ?? "pullTab-primary"])
const paddingClasses = computed(() => paddingSize[props.size ?? "normal"])
const shapeClasses = computed(() => positionShape[props.position])
const shadowClass = computed(() => (props.isShadow ? "shadow-sm shadow-black" : ""))
</script>
