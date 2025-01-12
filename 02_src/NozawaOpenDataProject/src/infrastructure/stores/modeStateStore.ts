import { create } from "zustand"
import { IModeState } from "@/domain/interfaces/IModeState"
import { persist, createJSONStorage } from "zustand/middleware"

const useModeStateStore = create<IModeState>()(
  persist(
  (set, get) => ({
  walkModeSelected: true,
  cycleModeSelected: false,
  busModeSelected: false,
  trainModeSelected: false,
  setWalkModeSelected: () =>
    set(() => ({
      walkModeSelected: true,
      cycleModeSelected: false,
      busModeSelected: false,
      trainModeSelected: false,
    })),
  setCycleModeSelected: () =>
    set(() => ({
      cycleModeSelected: true,
      walkModeSelected: false,
      busModeSelected: false,
      trainModeSelected: false,
    })),
  setBusModeSelected: () =>
    set(() => ({
      busModeSelected: true,
      walkModeSelected: false,
      cycleModeSelected: false,
      trainModeSelected: false,
    })),
  setTrainModeSelected: () =>
    set(() => ({
      trainModeSelected: true,
      walkModeSelected: false,
      cycleModeSelected: false,
      busModeSelected: false,
    })),
  getWalkModeSelected: () => get().walkModeSelected,
  getCycleModeSelected: () => get().cycleModeSelected,
  getBusModeSelected: () => get().busModeSelected,
  getTrainModeSelected: () => get().trainModeSelected,
}),
{
  name: "mode-store", // ローカルストレージのキー
  // 永続化に使用するストレージ
  storage: createJSONStorage(() => sessionStorage),
}
  )
)

export default useModeStateStore
