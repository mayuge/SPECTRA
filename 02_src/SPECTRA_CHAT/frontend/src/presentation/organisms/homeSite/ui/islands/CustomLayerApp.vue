<template>
  <div
    className="absolute top-19 right-16 z-10 bg-gray-30 p-2 select-none md:max-w-[450px] max-w-[60svw]"
  >
    <div className="pb-2 text-xs text-white">レイヤー切替</div>
    <div className="flex flex-wrap gap-2">
      <Button
        :variant="getTrainLayerVariant()"
        size="small"
        shape="square"
        iconLeft="train"
        text="鉄道"
        @button-clicked="toggleTrainLayer"
      />
      <Button
        :variant="getBusLayerVariant()"
        size="small"
        shape="square"
        iconLeft="directions_bus"
        text="バス"
        @button-clicked="toggleBusLayer"
      />
      <Button
        :variant="getCycleLayerVariant()"
        size="small"
        shape="square"
        iconLeft="directions_bike"
        text="サイクル"
        @button-clicked="toggleCycleLayer"
      />
      <Button
        :variant="getSatelliteLayerVariant()"
        size="small"
        shape="square"
        iconLeft="satellite"
        text="国土地理院 シームレス画像"
        @button-clicked="toggleSatelliteLayer"
      />
      <Button
        :variant="getPopulationMeshLayerVariant()"
        size="small"
        shape="square"
        iconLeft="border_all"
        text="国勢調査メッシュ2020"
        @button-clicked="togglePopulationMeshLayer"
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

import { onMounted } from 'vue'

onMounted(() => {
  onMountedCallback()
})

const {
  onMountedCallback,
  toggleTrainLayer,
  toggleCycleLayer,
  toggleBusLayer,
  togglePopulationMeshLayer,
  toggleSatelliteLayer,
  getTrainLayerVariant,
  getCycleLayerVariant,
  getBusLayerVariant,
  getPopulationMeshLayerVariant,
  getSatelliteLayerVariant
} = useCustomLayerApp(
    useReqTrainApi() as IReqTrainApi,
    useReqCycleApi() as IReqCycleApi,
    useReqBusApi() as IReqBusApi,
    useCustomLayerStore() as ICustomLayerState,
    useMapCustomLayer() as IMapCustomLayer
)
</script>
