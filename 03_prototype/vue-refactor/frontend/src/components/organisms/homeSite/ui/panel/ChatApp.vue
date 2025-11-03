<template>
  <div v-for="(obj,index) in getChatMessageList()">
    <RequestChat v-if="obj.type == 'request'" :text="obj.message" />
    <ResponseChat v-if="obj.type == 'response'" :text="obj.message" />
    <ErrorChat v-if="obj.type == 'error'" :text="obj.message" />
  </div>
</template>
<script setup lang="ts">
import type { IChatState } from '@/domain/interfaces/IChatState'
import { useChatStateStore } from '@/infrastructure/stores/chatStateStore'

import RequestChat from '@/components/molecules/frame/RequestChat.vue'
import ResponseChat from '@/components/molecules/frame/ResponseChat.vue'
import ErrorChat from '@/components/molecules/frame/ErrorChat.vue'
import useChatApp from "@/components/organisms/homeSite/core/panel/useChatApp"

const { getChatMessageList, getDataMessageLength } = useChatApp(useChatStateStore() as IChatState)
</script>
