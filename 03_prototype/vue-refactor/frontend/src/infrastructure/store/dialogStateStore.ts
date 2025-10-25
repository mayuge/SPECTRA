import type { IDialogState } from "@/domain/interfaces/IDialogState"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useDialogStateStore = defineStore<"dialogState", IDialogState>("dialogState", () => {
  // メインパネルの開閉状態
  const isMainPanelOpen = ref(true)

  // メインパネルのセッター
  const setMainPanelOpen = (isOpen: boolean) => {
    isMainPanelOpen.value = isOpen
  }

  // メインパネルのゲッター
  const getMainPanelOpen = () => {
    return isMainPanelOpen.value
  }

  return {
    setMainPanelOpen,
    getMainPanelOpen,
  }
})
