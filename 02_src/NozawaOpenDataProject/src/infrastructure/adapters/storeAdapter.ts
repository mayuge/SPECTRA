import useTestStore from "@/infrastructure/stores/testStore"
import type { ITestStoreState } from "@/domain/interfaces/ITestStore"

import useDialogStateStore from "@/infrastructure/stores/dialogStateStore"
import useManageLayerStateStore from "@/infrastructure/stores/manageLayerStateStore"
export const useTestStoreAdapter = (): ITestStoreState => useTestStore()
export const useDialogStoreAdapter = () => useDialogStateStore()
export const useManageLayerAdapter = () => useManageLayerStateStore()
