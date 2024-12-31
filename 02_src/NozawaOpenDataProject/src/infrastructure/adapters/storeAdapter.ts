import useTimeDataStore from "@/infrastructure/stores/timeDataStore"
import type { ITimeDataStore } from "@/domain/interfaces/ITimeDataStore"

import useDialogStateStore from "@/infrastructure/stores/dialogStateStore"
import useManageLayerStateStore from "@/infrastructure/stores/manageLayerStateStore"
export const useTimeDataStoreAdapter = (): ITimeDataStore => useTimeDataStore()
export const useDialogStoreAdapter = () => useDialogStateStore()
export const useManageLayerAdapter = () => useManageLayerStateStore()
