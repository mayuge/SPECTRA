import type { DialogNameType } from "@/domain/types/dialogNameType"
export interface IDialogState {
  getPanelWidth: () => number
  startResize: () => void
  stopResize: () => void
  toggleDialogState: (dialogName: keyof DialogNameType) => void
  setDialogState: (dialogName: keyof DialogNameType, isOpen: boolean) => void
  getDialogState: (dialogName: keyof DialogNameType) => boolean
}
