<template>
  <Header />
  <ChatPanelApp />
  <MapApp />
  <CustomLayerApp />
</template>
<script setup lang="ts">
import MapApp from "@/components/organisms/homeSite/ui/map/MapApp.vue"
import Header from "@/components/molecules/header/Header.vue"
import ChatPanelApp from "@/components/organisms/homeSite/ui/panel/ChatPanelApp.vue"
import CustomLayerApp from "@/components/organisms/homeSite/ui/panel/CustomLayerApp.vue"
</script>
