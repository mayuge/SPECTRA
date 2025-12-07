<template>
  <div
    :class="[
      variantStyles[variant] ?? variantStyles['badge-primary'],
      shapeStyles[shape] ?? shapeStyles['square'],
      'inline-flex items-center gap-1 text-[9px] p-1',
    ]"
    @click="badgeClicked"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import type { BadgeVariantType, BadgeShapeType } from "@/domain/types/atomsType"

type Props = {
  text?: string
  shape?: BadgeShapeType
  variant?: BadgeVariantType
}

const props = defineProps<Props>()

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

const text = props.text ?? ""
const shape = props.shape ?? "square"
const variant = props.variant ?? "badge-primary"
</script>
