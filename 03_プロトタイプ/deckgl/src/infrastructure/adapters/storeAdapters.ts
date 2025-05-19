import { IDialogState } from "@/domain/interfaces/IDialogState"
import useDialogStateStore from "@/infrastructure/stores/dialogStateStore"

export const useDialogStateAdapter = (): IDialogState => useDialogStateStore()
