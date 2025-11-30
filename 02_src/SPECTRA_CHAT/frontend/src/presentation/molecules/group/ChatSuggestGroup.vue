// ...existing code...
<template>
  <div class="flex items-center flex-wrap bg-gray-90 gap-1 p-2">
    <Badge
      v-for="(text, index) in textList"
      :key="index"
      :text="text"
      variant="badge-secondary"
      @badge-clicked="badgeClicked"
    />
  </div>
</template>

<script setup lang="ts">
import Badge from "@/presentation/atoms/labels/Badge.vue"
import type { PropType } from "vue"

defineProps({
  textList: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const emit = defineEmits(["badge-clicked"])

const badgeClicked = (text:string) =>{
  emit("badge-clicked", text)
}
</script>
