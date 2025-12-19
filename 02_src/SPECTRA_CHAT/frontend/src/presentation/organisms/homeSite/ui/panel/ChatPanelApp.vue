<template>
  <!-- =========================
       Mobile
  ========================== -->
  <div class="fixed bottom-0 z-50 w-full bg-transparent flex flex-col select-none md:hidden">
    <div class="sticky top-0">
      <DialogHeader
        text="SPECTRA CHAT"
        variant="header-dark"
        :isPullIcon="true"
        size="large"
        @header-clicked="toggleMainPanel()"
      />

      <ChatSuggestGroup
        v-if="!getMainPanelOpen()"
        :suggestList="CHAT_SUGGEST_LIST"
        @badge-clicked="submitButtonClicked"
      />

      <Submit
        v-if="!getMainPanelOpen()"
        :isLoading="true"
        @submit-button-clicked="submitButtonClicked"
      />
    </div>

    <div v-if="getMainPanelOpen()" class="bg-white h-[50svh] shadow-lg flex flex-col">
      <div class="flex-1 overflow-y-scroll no-scrollbar">
        <ConceptDisplay v-if="isBlankChat()" />
        <ChatApp @retry-clicked="submitButtonClicked" />
      </div>

      <ChatSuggestGroup :suggestList="CHAT_SUGGEST_LIST" @badge-clicked="suggestButtonClicked" />
      <Submit :isLoading="getIsLoading()" @submit-button-clicked="submitButtonClicked" />
    </div>
  </div>

  <!-- =========================
       PC
  ========================== -->
  <div class="fixed left-0 z-50 h-screen bg-transparent hidden md:flex select-none">
    <div
      v-if="getMainPanelOpen()"
      class="relative bg-white h-full shadow-lg flex flex-col"
      :style="{ width: panelWidth + 'px' }"
    >
      <div class="flex-1 pt-16 overflow-y-scroll no-scrollbar">
        <ConceptDisplay v-if="isBlankChat()" />
        <ChatApp @retry-clicked="submitButtonClicked" />
      </div>

      <ChatSuggestGroup :suggestList="CHAT_SUGGEST_LIST" @badge-clicked="suggestButtonClicked" />
      <Submit :isLoading="getIsLoading()" @submit-button-clicked="submitButtonClicked" />

      <!-- resize handle -->
      <div
        class="absolute top-0 right-0 h-full w-2 cursor-col-resize
               hover:bg-primary transition-colors"
        @mousedown="startResize"
      />
    </div>

    <div class="flex items-center">
      <PullTab
        title="パネルを開閉できます。"
        variant="pullTab-dark"
        :icon="getPullTabIcon()"
        position="left"
        size="mini"
        @button-clicked="toggleMainPanel()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

import type { IDialogState } from '@/domain/interfaces/IDialogState'
import type { IReqChatApi } from '@/domain/interfaces/IReqChatApi'
import type { IReqSuggestApi } from '@/domain/interfaces/IReqSuggestApi'
import type { IMapLayer } from '@/domain/interfaces/IMapLayer'
import type { IChatState } from '@/domain/interfaces/IChatState'
import type { IGeojsonState } from '@/domain/interfaces/IGeojsonState'
import type { ILoadingState } from '@/domain/interfaces/ILoadingState'

import { useDialogStateStore } from '@/infrastructure/stores/dialogStateStore'
import useReqChatApi from '@/infrastructure/http/chat/reqChatApi'
import useReqSuggestApi from '@/infrastructure/http/suggest/reqSuggestApi'
import useMapLayer from '@/infrastructure/map/mapLayer'
import { useChatStateStore } from '@/infrastructure/stores/chatStateStore'
import { useGeojsonStateStore } from '@/infrastructure/stores/geojsonStateStore'
import { useLoadingStateStore } from '@/infrastructure/stores/loadingStateStore'

import PullTab from '@/presentation/atoms/buttons/PullTab.vue'
import DialogHeader from '@/presentation/molecules/header/DialogHeader.vue'
import Submit from '@/presentation/molecules/input/Submit.vue'
import ChatSuggestGroup from '@/presentation/molecules/group/ChatSuggestGroup.vue'
import ChatApp from '@/presentation/organisms/homeSite/ui/panel/ChatApp.vue'
import ConceptDisplay from '@/presentation/molecules/display/ConceptDisplay.vue'
import { CHAT_SUGGEST_LIST } from '@/domain/params/chatSuggest'
import useChatPanelApp from '@/presentation/organisms/homeSite/core/panel/useChatPanelApp'

/* =========================
   local panel width (PC only)
========================= */
const panelWidth = ref(400)
const isResizing = ref(false)

const startResize = () => {
  isResizing.value = true
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

const resize = (e: MouseEvent) => {
  if (!isResizing.value) return
  panelWidth.value = Math.min(600, Math.max(280, e.clientX))
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}

onBeforeUnmount(stopResize)

const {
  getMainPanelOpen,
  toggleMainPanel,
  getPullTabIcon,
  isBlankChat,
  submitButtonClicked,
  suggestButtonClicked,
  getIsLoading,
} = useChatPanelApp(
  useDialogStateStore() as IDialogState,
  useReqChatApi() as IReqChatApi,
  useReqSuggestApi() as IReqSuggestApi,
  useMapLayer() as IMapLayer,
  useChatStateStore() as IChatState,
  useGeojsonStateStore() as IGeojsonState,
  useLoadingStateStore() as ILoadingState
)
</script>
