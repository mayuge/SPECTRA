import { create } from "zustand"
import type { IDisplayLayerState } from "@/domain/interfaces/IDisplayLayerState"

const useDisplayLayerStore = create<IDisplayLayerState>((set, get) => ({
  //レイヤーとidを一致させること
  layersObj: {
    "base-train-station-layer": true,
    "base-train-line-layer": true,
  },
  toggleDisplayLayer: (name) =>
    set((state) => ({
      layersObj: {
        ...state.layersObj,
        [name]: !(state.layersObj[name] ?? false),
      },
    })),
  addDisplayLayer: (name, visible = true) =>
    set((state) => ({
      layersObj: {
        ...state.layersObj,
        [name]: visible,
      },
    })),
  getDisplayLayer: (name) => get().layersObj[name],
}))

export default useDisplayLayerStore
