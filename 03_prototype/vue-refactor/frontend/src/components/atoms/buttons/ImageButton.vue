<template>
  <button
    :class="[
      paddingSize[size],
      variantStyles[variant] ?? variantStyles['btn-primary'],
      shapeStyles[shape] ?? shapeStyles['round'],
      isShadow ? 'shadow-md shadow-black' : '',
      'flex items-center gap-1 text-xs md:text-base'
    ]"
    @click="buttonClicked"
  >
    <span v-if="iconLeft" class="material-icons">{{ iconLeft }}</span>
    <img v-if="path" :src="path" alt="Image" class="w-8 h-8 md:w-7 md:h-7" />
    <span v-if="text">{{ text }}</span>
    <span v-if="iconRight" class="material-icons">{{ iconRight }}</span>
  </button>
</template>

<script setup lang="ts">

type ButtonVariantType =
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-danger'
  | 'btn-warning'
  | 'btn-success'
  | 'btn-dark'
  | 'btn-light'
  | 'btn-text-black'
  | 'btn-text-gray'
  | 'btn-text-white'

type ButtonShapeType = 'round' | 'square' | 'circle'
type ButtonSizeType = 'mini' | 'small' | 'normal' | 'large'

interface ImageButtonProps {
  text?: string
  iconLeft?: string
  iconRight?: string
  isShadow?: boolean
  shape?: ButtonShapeType
  size?: ButtonSizeType
  variant?: ButtonVariantType
  path: string
}

const props = defineProps<ImageButtonProps>()

const emit = defineEmits(['button-clicked'])

const buttonClicked = () => {
  emit('button-clicked')
}

const variantStyles: Record<ButtonVariantType, string> = {
  'btn-primary': 'bg-primary text-white hover:bg-primaryDark',
  'btn-secondary':'bg-secondary text-black',
  'btn-danger': 'bg-danger text-white',
  'btn-warning': 'bg-warning text-white',
  'btn-success': 'bg-success text-white',
  'btn-dark': 'bg-gray-20 text-white',
  'btn-light': 'bg-white text-gray-20',
  'btn-text-black': 'text-gray-20',
  'btn-text-gray': 'text-gray-50',
  'btn-text-white': 'text-white',
}

const shapeStyles: Record<ButtonShapeType, string> = {
  round: 'rounded',
  square: '',
  circle: 'rounded-full',
}

const paddingSize: Record<ButtonSizeType, string> = {
  mini: 'p-0',
  small: 'md:p-3 p-2',
  normal: 'md:p-4 p-3',
  large: 'md:p-6 p-4',
}

const { text = '', size = 'normal', shape = 'round', variant = 'btn-primary', iconLeft = '', iconRight = '', isShadow = false, path } = props
</script>
