import { IDialogState } from "@/domain/interfaces/IDialogState"
import useDialogStateStore from "@/infrastructure/stores/dialogStateStore"

import { IDisplayLayerState } from "@/domain/interfaces/IDisplayLayerState"
import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"

export const useDialogStateAdapter = (): IDialogState => useDialogStateStore()
export const useDisplayLayerStoreAdapter = (): IDisplayLayerState => useDisplayLayerStore()
