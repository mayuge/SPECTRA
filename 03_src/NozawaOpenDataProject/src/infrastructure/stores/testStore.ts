import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { ITestStoreState } from "@/domain/interfaces/ITestStore"

// Zustandストアの作成
const useTestStore = create<ITestStoreState>()(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      getCount: () => get().count,
    }),
    {
      name: "test-store", // ローカルストレージのキー
      // 永続化に使用するストレージ
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useTestStore
