import useTestStore from "@/infrastructure/stores/testStore"
import type { ITestStoreState } from "@/domain/interfaces/ITestStore"

import useDialogStateStore from "@/infrastructure/stores/DialogStateStore"

export const useTestStoreAdapter = (): ITestStoreState => useTestStore()
export const useDialogDialogStoreAdapter = () => useDialogStateStore()
