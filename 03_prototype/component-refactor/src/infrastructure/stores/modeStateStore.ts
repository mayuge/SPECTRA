import { create } from "zustand"
import { IModeState } from "@/domain/interfaces/IModeState"
import { persist, createJSONStorage } from "zustand/middleware"

const useModeStateStore = create<IModeState>()(
  persist(
    (set, get) => ({
      homeModeSelected: true,
      personModeSelected: false,
      groupModeSelected: false,
      fileModeSelected: false,
      setHomeModeSelected: () =>
        set(() => ({
          homeModeSelected: true,
          personModeSelected: false,
          groupModeSelected: false,
          fileModeSelected: false,
        })),
      setPersonModeSelected: () =>
        set(() => ({
          personModeSelected: true,
          homeModeSelected: false,
          groupModeSelected: false,
          fileModeSelected: false,
        })),
      setGroupModeSelected: () =>
        set(() => ({
          groupModeSelected: true,
          homeModeSelected: false,
          personModeSelected: false,
          fileModeSelected: false,
        })),
      setFileModeSelected: () =>
        set(() => ({
          fileModeSelected: true,
          homeModeSelected: false,
          personModeSelected: false,
          groupModeSelected: false,
        })),
      getHomeModeSelected: () => get().homeModeSelected,
      getPersonModeSelected: () => get().personModeSelected,
      getGroupModeSelected: () => get().groupModeSelected,
      getFileModeSelected: () => get().fileModeSelected,
    }),
    {
      name: "mode-store", // ローカルストレージのキー
      // 永続化に使用するストレージ
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useModeStateStore
