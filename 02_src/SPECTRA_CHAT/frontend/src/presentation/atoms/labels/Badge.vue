<template>
  <div
    :class="[
      variantClasses,
      shapeClasses,
      'inline-flex items-center gap-1 text-[9px] p-1 hover:brightness-90 cursor-pointer',
    ]"
    @click="badgeClicked"
  >
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import type { PropType } from "vue"
import type { BadgeVariantType, BadgeShapeType } from "@/domain/types/atomsType"

const props = defineProps({
  text: {
    type: String as PropType<string>,
    default: "",
  },
  shape: {
    type: String as PropType<BadgeShapeType>,
    default: "square",
  },
  variant: {
    type: String as PropType<BadgeVariantType>,
    default: "badge-primary",
  },
})

const emit = defineEmits(["badge-clicked"])

const badgeClicked = () => {
  emit("badge-clicked", props.text)
}

const variantStyles: Record<BadgeVariantType, string> = {
  "badge-primary": "bg-primary text-white border-[1px] border-primary",
  "badge-secondary": "bg-secondary text-white border-[1px] border-secondary",
  "badge-danger": "bg-danger text-white border-[1px] border-danger",
  "badge-warning": "bg-warning text-white border-[1px] border-warning",
  "badge-success": "bg-success text-white border-[1px] border-success",
  "badge-dark": "bg-gray-30 text-white border-[1px] border-gray-30",
}

const shapeStyles: Record<BadgeShapeType, string> = {
  square: "",
  round: "rounded-xs",
  circle: "rounded-full",
}

const variantClasses = computed(() => variantStyles[props.variant ?? "badge-primary"])
const shapeClasses = computed(() => shapeStyles[props.shape ?? "square"])
</script>
