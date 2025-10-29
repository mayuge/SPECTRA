<template>
  <div
    class="fixed bottom-0 md:left-0 z-50 w-full md:w-auto md:h-screen bg-transparent flex flex-col md:flex-row"
  >
    <div class="md:hidden sticky top-0">
      <DialogHeader
        text="SPECTRA CHAT"
        variant="header-dark"
        :isPullIcon="true"
        size="large"
        @header-clicked="toggleMainPanel()"
      />
      <Submit v-if="!getMainPanelOpen()" @submit-button-clicked="submitButtonClicked" />
    </div>
    <div
      v-if="getMainPanelOpen()"
      class="bg-white w-full md:w-[400px] h-[50svh] md:h-screen shadow-lg flex flex-col"
    >
      <div class="flex-1 overflow-y-auto p-2"></div>
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
import { useDialogStateStore } from '@/infrastructure/stores/dialogStateStore'
import useChatPanelApp from '@/components/organisms/homeSite/core/panel/useChatPanelApp'
import PullTab from '@/components/atoms/buttons/PullTab.vue'
import DialogHeader from '@/components/molecules/header/DialogHeader.vue'
import Submit from '@/components/molecules/input/Submit.vue'

const { getMainPanelOpen, toggleMainPanel, getPullTabIcon } =
  useChatPanelApp(useDialogStateStore() as IDialogState)

  const submitButtonClicked = (inputValue: string) => {
    console.log("Submit button clicked with input:", inputValue)
  }
</script>
