<template>
  <div class="flex items-center gap-2 p-2 w-full bg-white shadow-black shadow-sm">
    <Textarea :rows="2" :value="inputValue" @on-change-input="onChangeInput" />
    <Button
      @button-clicked="submitClicked"
      variant="btn-primary"
      size="large"
      icon-left="send"
      shape="circle"
      :isBorder="true"
    />
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/atoms/buttons/Button.vue"
import Textarea from "@/components/atoms/inputs/Textarea.vue"
import {ref} from "vue"

const inputValue = ref("")
const emit = defineEmits(["submit-button-clicked"])

const onChangeInput = (value: string) => {
  inputValue.value = value
}

const submitClicked = () => {
  emit("submit-button-clicked", inputValue.value)
  inputValue.value = ""
}
</script>
