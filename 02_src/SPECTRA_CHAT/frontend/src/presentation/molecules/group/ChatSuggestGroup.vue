<template>
  <div class="flex items-center flex-wrap  gap-1 px-2 pt-1">
    <Badge
      v-for="(suggest, index) in suggestList"
      title="押すとチャットできます。"
      :key="index"
      :text="suggest.text"
      variant="badge-secondary"
      @badge-clicked="badgeClicked(suggest)"
    />
  </div>
</template>

<script setup lang="ts">
import Badge from "@/presentation/atoms/labels/Badge.vue"
import type { PropType } from "vue"
import type { SuggestType } from "@/domain/types/suggestType";

defineProps({
  suggestList: {
    type: Array as PropType<SuggestType[]>,
    required: true,
  },
})

const emit = defineEmits(["badge-clicked"])

const badgeClicked = (suggest:SuggestType ) =>{
  emit("badge-clicked", suggest)
}
</script>
