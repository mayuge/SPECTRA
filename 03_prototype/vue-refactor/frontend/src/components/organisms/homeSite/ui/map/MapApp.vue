<template>
  <div id="map" class="absolute top-0 left-0 w-full h-screen z-0"></div>
</template>

<script setup lang="ts">
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import useMapInstance from "@/infrastructure/map/mapInstance"
import { onMounted } from "vue"
import useMapApp from "@/components/organisms/homeSite/core/map/useMapApp"
onMounted(() => {
  const { onMountedCallback } = useMapApp( useMapInstance() as IMapInstance)
  onMountedCallback()
})
</script>
