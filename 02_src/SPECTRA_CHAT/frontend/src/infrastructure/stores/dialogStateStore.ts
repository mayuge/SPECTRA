import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { DialogNameType } from "@/domain/types/dialogNameType"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useDialogStateStore = defineStore<"dialogState", IDialogState>("dialogState", () => {
  const isMainPanelOpen = ref<{ [key in DialogNameType]: boolean }>({
    mainPanel: true,
  })
  const panelWidth = ref(400)
  const isResizing = ref(false)

  const getPanelWidth = (): number => {
    return panelWidth.value
  }

  const startResize = () => {
    isResizing.value = true
    document.addEventListener("mousemove", resizePanel)
    document.addEventListener("mouseup", stopResize)
  }

  const resizePanel = (e: MouseEvent) => {
    if (!isResizing.value) return
    panelWidth.value = Math.min(600, Math.max(280, e.clientX))
  }

  const stopResize = () => {
    isResizing.value = false
    document.removeEventListener("mousemove", resizePanel)
    document.removeEventListener("mouseup", stopResize)
  }

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
    getPanelWidth,
    startResize,
    stopResize,
    toggleDialogState,
    setDialogState,
    getDialogState,
  }
})
