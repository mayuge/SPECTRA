<template>
  <div className="absolute top-19 right-16 z-10 bg-gray-30 px-4 py-3 select-none">
    <div className="pb-2 text-xs text-white">レイヤー切替</div>
    <div className="flex items-center gap-2">
      <Button
        :variant="getTrainLayerVarient()"
        size="small"
        shape="square"
        iconLeft="train"
        text="鉄道"
        @button-clicked="toggleTrainLayer"
      />
      <Button
        :variant="getBusLayerVarient()"
        size="small"
        shape="square"
        iconLeft="directions_bus"
        text="バス"
        @button-clicked="toggleBusLayer"
      />
      <Button
        :variant="getCycleLayerVarient()"
        size="small"
        shape="square"
        iconLeft="directions_bike"
        text="サイクル"
        @button-clicked="toggleCycleLayer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from '@/components/atoms/buttons/Button.vue'
import useCustomLayerApp from '@/components/organisms/homeSite/core/islands/useCustomLayerApp'

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

const { onMountedCallback, toggleTrainLayer, toggleCycleLayer,toggleBusLayer, getTrainLayerVarient, getCycleLayerVarient, getBusLayerVarient } = useCustomLayerApp( useReqTrainApi() as IReqTrainApi, useReqCycleApi() as IReqCycleApi, useReqBusApi() as IReqBusApi, useCustomLayerStore() as ICustomLayerState, useMapCustomLayer() as IMapCustomLayer)
</script>
