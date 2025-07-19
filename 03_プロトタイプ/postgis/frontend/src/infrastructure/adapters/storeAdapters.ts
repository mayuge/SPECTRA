import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { IDisplayLayerState } from "@/domain/interfaces/IDisplayLayerState"

import useDialogStateStore from "@/infrastructure/stores/dialogStateStore"
import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"

export const useDialogStateAdapter = (): IDialogState => useDialogStateStore()
export const useDisplayLayerStoreAdapter = (): IDisplayLayerState => useDisplayLayerStore()
