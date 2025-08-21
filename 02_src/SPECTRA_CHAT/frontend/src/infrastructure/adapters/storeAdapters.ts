import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { IDisplayLayerState } from "@/domain/interfaces/IDisplayLayerState"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"
import type { IChatState } from "@/domain/interfaces/IChatState"

import useDialogStateStore from "@/infrastructure/stores/useDialogStateStore"
import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"
import useGeojsonStateStore from "@/infrastructure/stores/useGeojsonStore"
import useChatStateStore from "@/infrastructure/stores/useChatStateStore"

export const useDialogStateAdapter = (): IDialogState => useDialogStateStore()
export const useDisplayLayerStoreAdapter = (): IDisplayLayerState => useDisplayLayerStore()
export const useGeojsonStateStoreAdapter = (): IGeojsonState => useGeojsonStateStore()
export const useChatStateStoreAdapter = (): IChatState => useChatStateStore()
