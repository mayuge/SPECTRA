import type { ITimeDataStore } from "@/domain/interfaces/ITimeDataStore"
import useTimeDataStore from "@/infrastructure/stores/timeDataStore"

import type { IDialogState } from "@/domain/interfaces/IDialogState"
import useDialogStateStore from "@/infrastructure/stores/dialogStateStore"

import type { IModeState } from "@/domain/interfaces/IModeState"
import useModeStateStore from "@/infrastructure/stores/modeStateStore"

export const useTimeDataStoreAdapter = (): ITimeDataStore => useTimeDataStore()
export const useDialogStoreAdapter = (): IDialogState => useDialogStateStore()
export const useModeStateStoreAdapter = (): IModeState => useModeStateStore()
