<template>
  <div class="flex justify-end w-full p-2 gap-1">
    <div class="flex items-end justify-end text-xs text-gray-40">
      <span>{{ requestTime }}</span>
    </div>
    <div
      class="relative bg-secondary flex justify-center text-white rounded-md px-2 py-8 text-xs w-[80%] whitespace-normal"
    >
      {{ text }}

      <div class="absolute top-2 right-2">
        <Button
          title="チャットをコピーできます。"
          variant="btn-text-white"
          icon-left="content_copy"
          size="mini"
          @button-clicked="copyText"
        />
      </div>
    </div>
  </div>

  <Button
    class="flex justify-end w-full px-2"
    variant="btn-text-gray"
    icon-left="comment"
    text="リトライ"
    title="同じチャットもう一度行うことができます。エラーが出てしまったとき、再度入力する必要がなくなります。"
    size="mini"
    @button-clicked="retryClicked(text)"
  />
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import { onMounted, ref } from "vue"
import Button from "@/presentation/atoms/buttons/Button.vue"

const props = defineProps({
  text: {
    type: String as PropType<string>,
  }
})

const emit = defineEmits(['retry-clicked'])

const retryClicked = (text: string) => {
  emit("retry-clicked", text)
}
const copyText = async () => {
  if (!props.text) return
  await navigator.clipboard.writeText(props.text)
}

const requestTime = ref("")

onMounted( () => {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, "0")
  const mm = String(now.getMinutes()).padStart(2, "0")
  requestTime.value = `${hh}:${mm}`
})
</script>
