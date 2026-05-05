<template>
  <header class="fixed flex items-center justify-between w-full bg-primary z-100 select-none">
    <div class="flex items-center">
      <ImageButton size="small" path="/image/app/logoBlack.svg" />
      <h1 class="text-lg font-oswald">SPECTRA CHAT</h1>
    </div>
    <ImageButton class="p-1" size="mini" path="/image/app/github.svg" @click="openGithub" />
  </header>
</template>
<script setup lang="ts">
import ImageButton from '@/presentation/atoms/buttons/ImageButton.vue';

const openGithub = () => {
  window.open('https://github.com/mayuge/SPECTRA/tree/develop/02_src/SPECTRA_CHAT', '_blank');
}
</script>
