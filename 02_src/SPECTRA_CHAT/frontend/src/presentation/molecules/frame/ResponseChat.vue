<template>
  <div class="flex flex-col justify-start w-full p-2 text-xs">
    <div
      class="bg-gray-90 flex justify-center text-black rounded-t-md px-2 py-4 w-[80%] wrap-break-word whitespace-normal"
    >
      {{ text }}
    </div>
    <div
      class="flex items-center w-[80%] rounded-b-md px-2 gap-2"
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
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue"
import Button from "@/presentation/atoms/buttons/Button.vue"

const iconState = ref(true)
const emit = defineEmits(["toggle-clicked"])

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
</script>
