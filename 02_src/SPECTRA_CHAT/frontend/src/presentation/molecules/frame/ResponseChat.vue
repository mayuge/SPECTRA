<template>
  <div class="flex justify-start w-full p-2 text-xs gap-1">
    <div class="flex flex-col w-[80%]">
      <div
        class="relative bg-gray-90 flex justify-center text-black rounded-t-md px-2 py-6 whitespace-normal"
      >
        {{ text }}

        <div class="absolute top-2 right-2 flex flex-col gap-1">
          <Button
            title="レイヤーを前面へ移動"
            class="text-gray-70"
            variant="btn-text-gray"
            icon-left="keyboard_arrow_up"
            size="mini"
            @button-clicked="frontToClicked"
          />

          <Button
            title="レイヤーを背面へ移動"
            class="text-gray-70"
            variant="btn-text-gray"
            icon-left="keyboard_arrow_down"
            size="mini"
            @button-clicked="backToClicked"
          />
        </div>
      </div>

      <div
        class="flex items-center rounded-b-md px-2 gap-2"
        title="対象のレイヤーを表示切り替え"
        :class="iconState ? 'bg-primary text-black border-t border-gray-50' : 'bg-gray-20 text-white'"
        @click="toggleClicked()"
      >
        <Button
          size="mini"
          :icon-left="iconState ? 'visibility': 'visibility_off'"
          :variant="iconState ? 'btn-text-black' : 'btn-text-white'"
        />
        <div>{{ iconState ? '表示中' : '非表示中' }}</div>
      </div>
    </div>

    <div class="flex items-end text-gray-40">
      {{ responseTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import { onMounted, ref } from "vue"
import Button from "@/presentation/atoms/buttons/Button.vue"

const iconState = ref(true)
const responseTime = ref("")
const emit = defineEmits(["toggle-clicked", "back-to-clicked", "front-to-clicked"])

const props = defineProps({
    text: {
        type: String as PropType<string>,
    },
    responseId: {
        type: Number as PropType<number>,
        required: true
    },
})

const toggleClicked = () => {
    iconState.value = !iconState.value
    emit("toggle-clicked", props.responseId)
}

const frontToClicked = () =>{
  emit("front-to-clicked")
}

const backToClicked = () =>{
  emit("back-to-clicked")
}

onMounted( () => {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, "0")
  const mm = String(now.getMinutes()).padStart(2, "0")
  responseTime.value = `${hh}:${mm}`
})
</script>
