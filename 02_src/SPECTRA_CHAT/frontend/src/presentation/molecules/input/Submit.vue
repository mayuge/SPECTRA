<template>
  <div class="flex items-center gap-2 p-2 w-full bg-white border-t border-gray-80">
    <Textarea
      :modelValue="inputValue"
      @update:modelValue="inputValue = $event"
      @keydown.enter.prevent="submitClicked"
      :rows="2"
      placeholder="都道府県、市区町村、住所、駅、鉄道路線"
    />
    <Button
      @button-clicked="submitClicked"
      title="テキストを入力してボタンを押してください。"
      variant="btn-primary"
      size="large"
      icon-left="send"
      shape="circle"
      :isBorder="true"
      v-if="!isLoading"
    />
    <Button
      title="チャットの返答のためにサーバーにアクセスしています。お待ちください。"
      variant="btn-dark"
      size="large"
      icon-left="stop"
      shape="circle"
      :isBorder="true"
      v-if="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "@/presentation/atoms/buttons/Button.vue"
import Textarea from "@/presentation/atoms/inputs/Textarea.vue"
import type { PropType } from "vue"
import { ref } from "vue"
defineProps({
  isLoading:{
    type:Boolean as PropType<boolean>,
    required:true
  }
})

const inputValue = ref("")
const emit = defineEmits(["submit-button-clicked"])

const submitClicked = () => {
  emit("submit-button-clicked", inputValue.value)
  inputValue.value = ""
}
</script>
