<template>
  <div class="flex items-center w-full pt-[0.5px]">
    <input
      title="レイヤーの透明度を変更できます。"
      type="range"
      min="0"
      max="1"
      step="0.1"
      :value="value"
      @change="onChange"
      class="slider w-15 cursor-pointer"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
const props = defineProps({
  value: Number as PropType<number>,
});
const emit = defineEmits(["on-change-input"])

const onChange = (e: Event) => {
  emit("on-change-input", Number((e.target as HTMLInputElement).value))
}
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  height: 6px;
  background: #b3b3b3;
  border-radius: 3px;
  vertical-align: middle;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #808080;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #808080;
  cursor: pointer;
}

.slider::-moz-range-track {
  height: 6px;
  background: #b3b3b3;
  border-radius: 3px;
}
</style>
