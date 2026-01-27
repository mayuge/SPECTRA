<template>
  <button
    :class="[
      paddingClasses,
      variantClasses,
      shapeClasses,
      shadowClass,
      'flex items-center gap-1 md:text-sm text-xs leading-none hover:brightness-90 cursor-pointer'
    ]"
    @click="buttonClicked"
  >
    <span v-if="iconLeft" class="material-icons">{{ iconLeft }}</span>
    <span v-if="text" :style="{ position: 'relative', top: '-1px' }">{{ text }}</span>
    <span v-if="iconRight" class="material-icons">{{ iconRight }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import type { PropType } from "vue"
import type { ButtonVariantType, ButtonSizeType, ButtonShapeType } from "@/domain/types/atomsType"

const props = defineProps({
  variant:{
    type:String as PropType<ButtonVariantType>,
    required:true,
    default:"btn-primary"
  },
  size:{
    type:String as PropType<ButtonSizeType>,
    required:true,
    default:"normal"
  },
  shape:{
    type:String as PropType<ButtonShapeType>
  },
  text:{
    type:String as PropType<string>,
    default:""
  },
  iconLeft:{
    type:String as PropType<string>
  },
  iconRight:{
    type:String as PropType<string>
  },
  isShadow:{
    type:Boolean as PropType<boolean>
  }
})

const emit = defineEmits(['button-clicked'])

const buttonClicked = () => {
  emit("button-clicked")
}

const variantStyles: Record<ButtonVariantType, string> = {
  "btn-primary": "bg-primary text-gray-20 hover:bg-primaryDark",
  "btn-secondary":
    "bg-white text-primary border-2 border-primary shadow-[inset_0_0_0_2px_var(--primary-color)]",
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
  small: "md:p-2 p-1",
  normal: "md:p-3 p-2",
  large: "md:p-4 p-3",
}

const variantClasses = computed(
  () => variantStyles[props.variant ?? "btn-primary"]
)
const shapeClasses = computed(() => shapeStyles[props.shape ?? "round"])
const paddingClasses = computed(() => paddingSize[props.size ?? "normal"])
const shadowClass = computed(() => (props.isShadow ? "shadow-md shadow-black/50" : ""))
</script>
