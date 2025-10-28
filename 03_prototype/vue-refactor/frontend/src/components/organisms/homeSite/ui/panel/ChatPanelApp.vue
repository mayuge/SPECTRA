<template>
  <div
    class="fixed bottom-0 md:left-0 z-50 w-full md:h-screen bg-transparent flex flex-col md:flex-row"
  >
    <div class="md:hidden sticky top-0">
      <DialogHeader
        text="SPECTRA CHAT"
        variant="header-dark"
        :isPullIcon="true"
        size="large"
        @header-clicked="toggleMainPanel()"
      />
    </div>

    <div class="flex flex-col bg-white ">
      <div v-if="getMainPanelOpen()" class="w-full md:w-[400px] h-[50svh] md:h-screen">
        <div class="flex-1 overflow-y-auto p-2"></div>
      </div>
      <Submit />
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
import { useDialogStateStore } from '@/infrastructure/store/dialogStateStore'
import useChatPanelApp from '@/components/organisms/homeSite/core/panel/useChatPanelApp'
import PullTab from '@/components/atoms/buttons/PullTab.vue'
import DialogHeader from '@/components/molecules/header/DialogHeader.vue'
import Submit from '@/components/molecules/input/Submit.vue'

const { getMainPanelOpen, toggleMainPanel, getPullTabIcon } =
  useChatPanelApp(useDialogStateStore() as IDialogState)
</script>
