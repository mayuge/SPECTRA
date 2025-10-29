import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { DialogNameType } from "@/domain/types/dialogNameType"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useDialogStateStore = defineStore<"dialogState", IDialogState>("dialogState", () => {
  const isMainPanelOpen = ref<{ [key in DialogNameType]: boolean }>({
    mainPanel: true,
  })

  const toggleDialogState = (dialogName: keyof DialogNameType) => {
    isMainPanelOpen.value[dialogName] = !isMainPanelOpen.value[dialogName]
  }

  const setDialogState = (dialogName: keyof DialogNameType, isOpen: boolean) => {
    isMainPanelOpen.value[dialogName] = isOpen
  }

  const getDialogState = (dialogName: keyof DialogNameType) => {
    return isMainPanelOpen.value[dialogName]
  }

  return {
    toggleDialogState,
    setDialogState,
    getDialogState,
  }
})
