<template>
  <div
    class="flex items-center flex-wrap bg-gray-80 gap-1 px-2 py-1
           max-h-20 overflow-y-auto no-scrollbar"
  >
    <Badge
      v-for="(text, index) in historyList"
      :key="index"
      title="押すとチャットできます。"
      :text="text"
      variant="badge-secondary"
      @badge-clicked="badgeClicked(text)"
    />
  </div>
</template>

<script setup lang="ts">
import Badge from "@/presentation/atoms/labels/Badge.vue"
import type { PropType } from "vue"

defineProps({
  historyList: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const emit = defineEmits(["badge-clicked"])

const badgeClicked = (text:string ) =>{
  emit("badge-clicked", text)
}
</script>
