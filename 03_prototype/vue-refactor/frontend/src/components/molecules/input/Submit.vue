<template>
  <div class="flex items-center gap-2 p-2 w-full shadow-black shadow-sm">
    <Textarea :rows="2" value="" />
    <Button variant="btn-primary" size="large" icon-left="send" shape="circle" :isBorder="true" />
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/atoms/buttons/Button.vue"
import Textarea from "@/components/atoms/inputs/Textarea.vue"
</script>
