import type { DialogNameType } from "@/domain/types/dialogNameType"
export interface IDialogState {
  toggleDialogState: (dialogName: keyof DialogNameType) => void
  setDialogState: (dialogName: keyof DialogNameType, isOpen: boolean) => void
  getDialogState: (dialogName: keyof DialogNameType) => boolean
}
