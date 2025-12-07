<template>
  <div
    :class="[headerVariant, headerShape, headerShadow, paddingClass, 'w-full flex flex-col']"
    @click="headerClicked"
  >
    <div v-if="isPullIcon" class="absolute top-1 left-1/2 -translate-x-1/2">
      <div class="h-1 w-10 bg-gray-50 rounded-full"></div>
    </div>

    <div class="flex items-center px-4 md:text-base text-xs font-bold w-full">
      <div class="text-inherit">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
type HeaderVariantType =
  | 'header-primary'
  | 'header-secondary'
  | 'header-danger'
  | 'header-warning'
  | 'header-success'
  | 'header-dark'
  | 'header-light'

type HeaderSizeType = 'mini' | 'small' | 'normal' | 'large'

interface Props {
  text?: string
  size?: HeaderSizeType
  variant: HeaderVariantType
  shape?: 'circle' | 'square'
  isPullIcon?: boolean
  isShadow?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['header-clicked'])

const headerClicked = () => {
  emit("header-clicked")
}

const headerVariants: Record<HeaderVariantType, string> = {
  'header-primary': 'bg-primary text-white',
  'header-secondary': 'bg-white text-primary border-2 border-primary shadow-[inset_0_0_0_2px_var(--primary-color)]',
  'header-danger': 'bg-danger text-white',
  'header-warning': 'bg-warning text-white',
  'header-success': 'bg-success text-white',
  'header-dark': 'bg-gray-20 text-white',
  'header-light': 'bg-white text-gray-20',
}

const headerVariant = headerVariants[props.variant] ?? 'bg-primary text-white'
const headerShape = props.shape === 'circle' ? 'rounded-t-full'
                  : props.shape === 'square' ? ''
                  : 'rounded-t-lg'
const headerShadow = props.isShadow ? 'shadow-black shadow-md' : ''

// サイズに応じた padding を設定
const paddingMap: Record<HeaderSizeType, string> = {
  mini: 'py-1',
  small: 'py-2',
  normal: 'py-3',
  large: 'py-4',
}

const paddingClass = props.size ? paddingMap[props.size] : paddingMap['normal']
</script>
