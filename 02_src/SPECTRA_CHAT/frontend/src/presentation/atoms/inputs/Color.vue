<template>
  <div
    title="レイヤーの色を変更できます。"
    class="w-4 h-4 rounded-full cursor-pointer"
    :style="{ backgroundColor: color }"
    @click="openPicker"
  ></div>

  <input ref="inputRef" type="color" class="hidden" :value="color" @input="onInput" />
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import { ref, watch } from "vue"

const props = defineProps({
  value: {
     type: String as PropType<string>,
     default: "#ffffff"
    },
})
const emit = defineEmits(["on-change-input"])

// 内部状態を持たせて表示を同期
const color = ref(props.value)

// 親から value が変わったら color も更新
watch(() => props.value, (value) => {
  color.value = value
})

// 色ボックスを押すと input[type=color] を開く
const inputRef = ref<HTMLInputElement | null>(null)
const openPicker = () => inputRef.value?.click()

// 色変更時
const onInput = (e: Event) => {
  const hex = (e.target as HTMLInputElement).value
  color.value = hex       // ← これでボックスの色も変わる
  emit("on-change-input", hex)
}
</script>
