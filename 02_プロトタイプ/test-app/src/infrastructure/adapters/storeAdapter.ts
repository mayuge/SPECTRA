import useTestStore from "@/infrastructure/stores/testStore"
import type { ITestStoreState } from "@/domain/interfaces/ITestStore"

import useDialogStateStore from "@/infrastructure/stores/dialogStateStore"

export const useTestStoreAdapter = (): ITestStoreState => useTestStore()
export const useDialogStoreAdapter = () => useDialogStateStore()
