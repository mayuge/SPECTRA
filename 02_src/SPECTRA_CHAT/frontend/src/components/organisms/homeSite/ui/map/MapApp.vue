<template>
  <div id="map" class="absolute top-0 left-0 w-full h-screen z-0 select-none"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import useMapApp from "@/components/organisms/homeSite/core/map/useMapApp"

import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPlugin } from "@/domain/interfaces/IMapPlugin"

import useMapInstance from "@/infrastructure/map/mapInstance"
import useMapPlugin from "@/infrastructure/map/mapPlugin"

onMounted(() => {
  const { onMountedCallback } = useMapApp( useMapInstance() as IMapInstance, useMapPlugin() as IMapPlugin)
  onMountedCallback()
})
</script>
