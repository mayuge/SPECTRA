<template>
  <div
    class="flex flex-col justify-center items-center text-center w-full md:h-[65svh] h-[25svh] text-gray-70"
  >
    <Button
      variant="btn-text-gray"
      size="large"
      icon-left="commute"
      class="[&_span.material-icons]:text-[150px]!"
    />
    <div class="mt-1\ text-sm">
      SPECTRA CHATは、チャットでデータを可視化できます。<br />画面下部の入力欄を使って、チャットを開始できます。
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/presentation/atoms/buttons/Button.vue"
</script>
