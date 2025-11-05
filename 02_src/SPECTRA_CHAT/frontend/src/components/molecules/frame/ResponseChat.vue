<template>
  <div class="flex flex-col justify-start w-full p-2 text-xs">
    <div class="bg-gray-80 flex justify-center text-black rounded-t-md px-2 py-4  w-[60%] ">
      {{ text }}
    </div>
    <div
      class="flex items-center bg-gray-20 w-[60%] rounded-b-md px-2 gap-2 text-white"
      @click="toggleClicked()"
    >
      <Button
        size="mini"
        :icon-left="iconState ? 'visibility': 'visibility_off'"
        variant="btn-text-white"
      />
      <div>表示切替</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import  { ref, type PropType } from "vue"
import Button from "@/components/atoms/buttons/Button.vue"

const iconState = ref(true)

const emit = defineEmits(["toggle-clicked"])

const toggleClicked = () => {
    iconState.value = !iconState.value
    emit("toggle-clicked", props.responseId)
}

const props = defineProps({
    text : {
        type: String as PropType<string>,
    },
    responseId : {
        type:Number as PropType<number>,
        required:true
    },
})
</script>
