<template>
  <div id="map" class="absolute top-0 left-0 w-full h-screen z-0"></div>
</template>

<script setup lang="ts">
import type { ICreateMap } from "@/domain/interfaces/ICreateMap"
import useCreateMap from "@/infrastructure/map/createMap"
import { onMounted } from "vue"
import useMapApp from "@/components/organisms/homeSite/core/map/useMapApp"
onMounted(() => {
  const { onMountedCallback } = useMapApp( useCreateMap() as ICreateMap)
  onMountedCallback()
})
</script>
