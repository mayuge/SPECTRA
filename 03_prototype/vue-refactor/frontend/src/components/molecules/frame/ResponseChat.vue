<template>
  <div class="flex justify-start w-full p-2">
    <div class="bg-gray-80 flex justify-center text-black rounded-md px-2 py-4 text-xs w-[50%] ">
      {{ text }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue"

defineProps({
    text : {
        type: String as PropType<string>,
    }
})
</script>
