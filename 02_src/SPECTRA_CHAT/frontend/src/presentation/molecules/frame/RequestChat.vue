<template>
  <div class="flex items-center justify-end w-full p-2 gap-1">
    <div
      class="bg-secondary flex justify-center text-white rounded-l-md px-2 py-4 text-xs w-[80%] "
    >
      {{ text }}
    </div>
    <div class="w-1 h-12 bg-secondary"></div>
  </div>
  <Button
    class="flex justify-end w-full px-2"
    variant="btn-text-gray"
    icon-left="comment"
    text="リトライ"
    size="mini"
    @button-clicked="retryClicked(text)"
  />
</template>
<script setup lang="ts">
import type { PropType } from "vue"
import Button from "@/presentation/atoms/buttons/Button.vue"
defineProps({
    text : {
        type: String as PropType<string>,
    }
})

const emit = defineEmits(['retry-clicked'])

const retryClicked = (text:string) => {
  emit("retry-clicked",text)
}
</script>
