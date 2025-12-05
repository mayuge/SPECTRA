<template>
  <div v-for="(obj, index) in chatMessages" :key="index">
    <RequestChat v-if="obj.type === 'request'" :text="obj.message" @retry-clicked="retryClicked" />
    <ResponseChat
      v-else-if="obj.type === 'response'"
      :text="obj.message"
      :responseId="getResponseIndex(index)"
      @toggle-clicked="toggleResponseLayer(getResponseIndex(index))"
      @front-to-clicked="frontToResponseLayer(getResponseIndex(index))"
      @back-to-clicked="backToResponseLayer(getResponseIndex(index))"
    />
    <ErrorChat v-else-if="obj.type === 'error'" :text="obj.message" />
  </div>
</template>

<script setup lang="ts">
import { computed  } from "vue"
import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"

import { useChatStateStore } from "@/infrastructure/stores/chatStateStore"
import useMapLayer from "@/infrastructure/map/mapLayer"
import useChatApp from "@/presentation/organisms/homeSite/core/panel/useChatApp"

import RequestChat from "@/presentation/molecules/frame/RequestChat.vue"
import ResponseChat from "@/presentation/molecules/frame/ResponseChat.vue"
import ErrorChat from "@/presentation/molecules/frame/ErrorChat.vue"

const {
  getChatMessageList,
  getResponseIndex,
  toggleResponseLayer,
  frontToResponseLayer,
  backToResponseLayer,
} = useChatApp(
  useChatStateStore() as IChatState,
  useMapLayer() as IMapLayer
)

const emit = defineEmits(['retry-clicked'])

const retryClicked = (text:string) => {
  emit("retry-clicked",text)
}

const chatMessages = computed(() => getChatMessageList())
</script>
