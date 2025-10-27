<template>
  <div class="fixed z-50 flex md:items-center md:left-0 md:top-0 md:h-screen bottom-0">
    <div class="fixed md:hidden w-full">
      <DialogHeader
        text="SPECTRA CHAT"
        variant="header-dark"
        :isPullIcon="true"
        size="large"
        @click="() => {}"
      />
    </div>
    <div
      v-if="getMainPanelOpen()"
      class="bg-white w-full md:w-md h-[50svh] md:h-screen shadow-lg"
    ></div>
    <div class="hidden md:flex">
      <PullTab
        variant="pullTab-dark"
        :icon="getPullTabIcon()"
        position="left"
        size="mini"
        @click="toggleMainPanel()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDialogState } from '@/domain/interfaces/IDialogState'
import { useDialogStateStore }  from '@/infrastructure/store/dialogStateStore'
import useChatPanelApp from '@/components/organisms/homeSite/core/panel/useChatPanelApp'
import PullTab from '@/components/atoms/buttons/PullTab.vue'
import DialogHeader from '@/components/molecules/header/DialogHeader.vue'
const { getMainPanelOpen, toggleMainPanel, getPullTabIcon, } = useChatPanelApp(useDialogStateStore() as IDialogState)
</script>
