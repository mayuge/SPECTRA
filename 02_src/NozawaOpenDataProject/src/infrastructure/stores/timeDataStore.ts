import { create } from "zustand"
import type { ITimeDataStore } from "@/domain/interfaces/ITimeDataStore"

// Zustandストアの作成
const useTimeDataStore = create<ITimeDataStore>((set, get) => ({
  timeData: "",
  setTimeData: (value: string) => set({ timeData: value }),
  getTimeData: () => get().timeData,
}))
export default useTimeDataStore
