import { create } from "zustand"
import { IModeState } from "@/domain/interfaces/IModeState"

const useModeStateStore = create<IModeState>()((set, get) => ({
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
}))

export default useModeStateStore
