import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface TestStoreState {
  count: number
  increment: () => void
  decrement: () => void
  getCount: () => number
}

// Zustandストアの作成
const useDialogStateStore = create<TestStoreState>()(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      getCount: () => get().count,
    }),
    {
      name: "dialog-state-store", // ローカルストレージのキー
      // 永続化に使用するストレージ
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useDialogStateStore
