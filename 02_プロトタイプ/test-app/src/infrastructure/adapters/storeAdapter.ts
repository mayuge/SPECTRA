import useTestStore from "@/infrastructure/stores/testStore"
import type { ITestStoreState } from "@/domain/interfaces/ITestStore"
export const useTestStoreAdapter = (): ITestStoreState => useTestStore()
