<template>
  <Header />
  <ChatPanelApp />
  <MapApp />
  <CustomLayerApp />
</template>
<script setup lang="ts">
import MapApp from "@/presentation/organisms/homeSite/ui/map/MapApp.vue"
import Header from "@/presentation/molecules/header/Header.vue"
import ChatPanelApp from "@/presentation/organisms/homeSite/ui/panel/ChatPanelApp.vue"
import CustomLayerApp from "@/presentation/organisms/homeSite/ui/islands/CustomLayerApp.vue"
</script>
