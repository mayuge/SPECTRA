<template>
  <div class="flex justify-end w-full p-2">
    <div class="bg-secondary flex justify-center text-white rounded-md px-2 py-4 text-xs w-[60%] ">
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
