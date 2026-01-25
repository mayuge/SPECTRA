<template>
  <div
    class="absolute top-13 right-16 z-10 bg-gray-30 p-2 select-none md:max-w-[450px] max-w-[60svw]"
  >
    <div class="flex items-center justify-between pb-2 text-xs text-white">
      <div>レイヤー切替</div>
      <div>取得時刻 {{ pageOpenedTime }}</div>
    </div>

    <div class="flex flex-wrap gap-2">
      <Button
        title="クリックで鉄道レイヤーを表示切替できます。"
        :variant="getTrainLayerVariant()"
        size="small"
        shape="square"
        iconLeft="train"
        text="鉄道"
        @button-clicked="toggleTrainLayer"
      />
      <Button
        title="クリックでバスレイヤーを表示切替できます。"
        :variant="getBusLayerVariant()"
        size="small"
        shape="square"
        iconLeft="directions_bus"
        text="バス"
        @button-clicked="toggleBusLayer"
      />
      <Button
        title="クリックでサイクルレイヤーを表示切替できます。"
        :variant="getCycleLayerVariant()"
        size="small"
        shape="square"
        iconLeft="directions_bike"
        text="サイクル"
        @button-clicked="toggleCycleLayer"
      />
      <Button
        title="クリックで国土地理院 シームレス画像レイヤーを表示切替できます。"
        :variant="getSatelliteLayerVariant()"
        size="small"
        shape="square"
        iconLeft="satellite"
        text="国土地理院 シームレス画像"
        @button-clicked="toggleSatelliteLayer"
      />
      <Button
        title="クリックで国勢調査メッシュ2020レイヤーを表示切替できます。"
        :variant="getPopulationMeshLayerVariant()"
        size="small"
        shape="square"
        iconLeft="border_all"
        text="国勢調査メッシュ2020"
        @button-clicked="togglePopulationMeshLayer"
      />
      <Button
        title="クリックで洪水浸水想定区域（想定最大規模）レイヤーを表示切替できます。"
        :variant="getFloodHazardLayerVariant()"
        size="small"
        shape="square"
        iconLeft="flood"
        text="洪水浸水想定区域（想定最大規模）"
        @button-clicked="toggleFloodHazardLayer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from '@/presentation/atoms/buttons/Button.vue'
import useCustomLayerApp from '@/presentation/organisms/homeSite/core/islands/useCustomLayerApp'

import type { IReqTrainApi } from '@/domain/interfaces/IReqTrainApi'
import type { IReqCycleApi } from '@/domain/interfaces/IReqCycleApi'
import type { IReqBusApi } from '@/domain/interfaces/IReqBusApi'
import type { ICustomLayerState } from '@/domain/interfaces/ICustomLayerState'
import type { IMapCustomLayer } from '@/domain/interfaces/IMapCustomLayer'

import useReqTrainApi from '@/infrastructure/http/train/reqTrainApi'
import useReqCycleApi from '@/infrastructure/http/cycle/reqCycleApi'
import useReqBusApi from '@/infrastructure/http/bus/reqBusApi'

import { useCustomLayerStore } from '@/infrastructure/stores/customLayerStateStore'
import useMapCustomLayer from '@/infrastructure/map/mapCustomLayer'

import { onMounted, ref } from 'vue'

const pageOpenedTime = ref("")

onMounted(async () => {
  await onMountedCallback()
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, "0")
  const mm = String(now.getMinutes()).padStart(2, "0")

  pageOpenedTime.value = `${hh}:${mm}`
})

const {
  onMountedCallback,
  toggleTrainLayer,
  toggleCycleLayer,
  toggleBusLayer,
  togglePopulationMeshLayer,
  toggleSatelliteLayer,
  toggleFloodHazardLayer,
  getTrainLayerVariant,
  getCycleLayerVariant,
  getBusLayerVariant,
  getPopulationMeshLayerVariant,
  getSatelliteLayerVariant,
  getFloodHazardLayerVariant,
} = useCustomLayerApp(
    useReqTrainApi() as IReqTrainApi,
    useReqCycleApi() as IReqCycleApi,
    useReqBusApi() as IReqBusApi,
    useCustomLayerStore() as ICustomLayerState,
    useMapCustomLayer() as IMapCustomLayer
)
</script>
