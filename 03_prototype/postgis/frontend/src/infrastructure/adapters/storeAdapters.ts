import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { IDisplayLayerState } from "@/domain/interfaces/IDisplayLayerState"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"

import useDialogStateStore from "@/infrastructure/stores/dialogStateStore"
import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"
import useGeojsonStateStore from "@/infrastructure/stores/useGeojsonStore"

export const useDialogStateAdapter = (): IDialogState => useDialogStateStore()
export const useDisplayLayerStoreAdapter = (): IDisplayLayerState => useDisplayLayerStore()
export const useGeojsonStateStoreAdapter = (): IGeojsonState => useGeojsonStateStore()
