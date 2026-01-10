<template>
  <div v-for="(obj, index) in chatMessages" :key="index">
    <RequestChat v-if="obj.type === 'request'" :text="obj.message" @retry-clicked="retryClicked" />
    <ResponseChat
      v-else-if="obj.type === 'response'"
      :text="obj.message"
      :is-loading="getIsLoading()"
      :responseId="getResponseIndex(index)"
      :layerColor="getGeojsonColorbyIndex(getResponseIndex(index))"
      @toggle-clicked="toggleResponseLayer(getResponseIndex(index))"
      @front-to-clicked="frontToResponseLayer(getResponseIndex(index))"
      @back-to-clicked="backToResponseLayer(getResponseIndex(index))"
      @on-color-input="setColorByIndex(getResponseIndex(index), $event)"
      @on-slider-input="setOpacityByIndex(getResponseIndex(index), $event)"
      @feedback-button-clicked="feedbackButtonClicked"
    />
    <ErrorChat v-else-if="obj.type === 'error'" :text="obj.message" />
  </div>
</template>

<script setup lang="ts">
import { computed  } from "vue"
import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"
import type { ILoadingState } from "@/domain/interfaces/ILoadingState"

import { useChatStateStore } from "@/infrastructure/stores/chatStateStore"
import useMapLayer from "@/infrastructure/map/mapLayer"
import { useGeojsonStateStore } from "@/infrastructure/stores/geojsonStateStore"
import useChatApp from "@/presentation/organisms/homeSite/core/panel/useChatApp"
import { useLoadingStateStore } from "@/infrastructure/stores/loadingStateStore"

import RequestChat from "@/presentation/molecules/frame/RequestChat.vue"
import ResponseChat from "@/presentation/molecules/frame/ResponseChat.vue"
import ErrorChat from "@/presentation/molecules/frame/ErrorChat.vue"

const {
  getChatMessageList,
  getResponseIndex,
  toggleResponseLayer,
  frontToResponseLayer,
  backToResponseLayer,
  setOpacityByIndex,
  setColorByIndex,
  getGeojsonColorbyIndex,
  getIsLoading,
} = useChatApp(
  useChatStateStore() as IChatState,
  useMapLayer() as IMapLayer,
  useGeojsonStateStore() as IGeojsonState,
  useLoadingStateStore() as ILoadingState
)

const emit = defineEmits(['retry-clicked', 'feedback-button-clicked'])

const retryClicked = (text:string) => {
  emit("retry-clicked",text)
}

const feedbackButtonClicked = (text: string, responseId: number) => {
  emit("feedback-button-clicked", text, responseId)
  console.log("ChatAppフィードバックボタンがクリックされました:", text, responseId)
}

const chatMessages = computed(() => getChatMessageList())
</script>
