<template>
  <div class="flex items-center gap-2 p-2 w-full bg-white border-t border-gray-80">
    <Textarea
      :rows="2"
      :value="inputValue"
      placeholder="都道府県、市区町村、住所、駅、鉄道路線"
      @on-change-input="onChangeInput"
    />
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
import Button from "@/presentation/atoms/buttons/Button.vue"
import Textarea from "@/presentation/atoms/inputs/Textarea.vue"
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
