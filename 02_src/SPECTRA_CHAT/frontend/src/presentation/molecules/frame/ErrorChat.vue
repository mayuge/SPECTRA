<template>
  <div class="flex justify-start w-full p-2">
    <div class="bg-danger flex justify-center text-white rounded-md px-2 py-4 text-xs w-[50%] ">
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
