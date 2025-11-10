<template>
  <div className="absolute top-20 right-16 z-10 bg-gray-30 px-4 py-3">
    <div className="pb-2 text-xs text-white">レイヤー切替</div>
    <div className="flex items-center gap-2">
      <Button variant="btn-light" size="small" shape="square" iconLeft="train" text="鉄道" />
      <Button
        variant="btn-light"
        size="small"
        shape="square"
        iconLeft="directions_bike"
        text="サイクル"
      />
    </div>
  </div>
</template>
<script setup="ts">
import Button from '@/components/atoms/buttons/Button.vue'
import useCustomLayerApp from '@/components/organisms/homeSite/core/panel/useCustomLayerApp'

const { toggleTrainLayer, toggleCycleLayer } = useCustomLayerApp
</script>
