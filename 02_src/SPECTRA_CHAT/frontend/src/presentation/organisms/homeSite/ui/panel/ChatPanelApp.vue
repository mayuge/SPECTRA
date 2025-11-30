<template>
  <div
    class="fixed bottom-0 md:left-0 z-50 w-full md:w-auto md:h-screen bg-transparent flex flex-col md:flex-row select-none"
  >
    <div class="md:hidden sticky top-0">
      <DialogHeader
        text="SPECTRA CHAT"
        variant="header-dark"
        :isPullIcon="true"
        size="large"
        @header-clicked="toggleMainPanel()"
      />
      <ChatSuggestGroup
        v-if="!getMainPanelOpen()"
        :textList="CHAT_SUGGEST_LIST"
        @badge-clicked="submitButtonClicked"
      />
      <Submit v-if="!getMainPanelOpen()" @submit-button-clicked="submitButtonClicked" />
    </div>
    <div
      v-if="getMainPanelOpen()"
      class="bg-white justify-bottom w-full md:w-[400px] h-[50svh] md:h-screen shadow-lg flex flex-col"
    >
      <div class="flex-1 md:pt-16 overflow-y-scroll">
        <ChatApp @retry-clicked="submitButtonClicked" />
      </div>
      <ChatSuggestGroup :textList="CHAT_SUGGEST_LIST" @badge-clicked="submitButtonClicked" />
      <Submit @submit-button-clicked="submitButtonClicked" />
    </div>
    <div class="hidden md:flex items-center">
      <PullTab
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
import type { IDialogState } from '@/domain/interfaces/IDialogState'
import type { IReqChatApi } from '@/domain/interfaces/IReqChatApi'
import type { IMapLayer } from '@/domain/interfaces/IMapLayer'
import type { IChatState } from '@/domain/interfaces/IChatState'
import type { IGeojsonState } from '@/domain/interfaces/IGeojsonState'

import { useDialogStateStore } from '@/infrastructure/stores/dialogStateStore'
import useReqChatApi from '@/infrastructure/http/chat/reqChatApi'
import useMapLayer from '@/infrastructure/map/mapLayer'
import { useChatStateStore } from '@/infrastructure/stores/chatStateStore'
import { useGeojsonStateStore } from '@/infrastructure/stores/geojsonStateStore'

import PullTab from '@/presentation/atoms/buttons/PullTab.vue'
import DialogHeader from '@/presentation/molecules/header/DialogHeader.vue'
import Submit from '@/presentation/molecules/input/Submit.vue'
import ChatSuggestGroup from '@/presentation/molecules/group/ChatSuggestGroup.vue'
import ChatApp from '@/presentation/organisms/homeSite/ui/panel/ChatApp.vue'
import { CHAT_SUGGEST_LIST } from '@/domain/params/chatSuggest'
import useChatPanelApp from '@/presentation/organisms/homeSite/core/panel/useChatPanelApp'

const { getMainPanelOpen, toggleMainPanel, getPullTabIcon, submitButtonClicked } =
  useChatPanelApp(
    useDialogStateStore() as IDialogState,
    useReqChatApi() as IReqChatApi,
    useMapLayer() as IMapLayer,
    useChatStateStore() as IChatState,
    useGeojsonStateStore() as IGeojsonState
  )
</script>
