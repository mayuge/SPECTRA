<template>
  <div v-for="(obj, index) in chatMessages" :key="index">
    <RequestChat v-if="obj.type === 'request'" :text="obj.message" />
    <ResponseChat
      v-else-if="obj.type === 'response'"
      :text="obj.message"
      :responseId="getResponseIndex(index)"
      @toggle-clicked="toggleResponseLayer(getResponseIndex(index))"
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
import useChatApp from "@/components/organisms/homeSite/core/panel/useChatApp"

import RequestChat from "@/components/molecules/frame/RequestChat.vue"
import ResponseChat from "@/components/molecules/frame/ResponseChat.vue"
import ErrorChat from "@/components/molecules/frame/ErrorChat.vue"

const {
  getChatMessageList,
  getResponseIndex,
  toggleResponseLayer,
} = useChatApp(
  useChatStateStore() as IChatState,
  useMapLayer() as IMapLayer
)

const chatMessages = computed(() => getChatMessageList())
</script>
