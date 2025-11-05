import { create } from "zustand"
import type { IDisplayLayerState } from "@/domain/interfaces/IDisplayLayerState"

const useDisplayLayerStore = create<IDisplayLayerState>((set, get) => ({
  //レイヤーとidを一致させること
  layersObj: {
    "base-train-station-layer": true,
    "base-train-line-layer": true,
    "hello-cycle-station-layer": true,
    "docomo-bike-share-station-layer": true,
  },
  toggleDisplayLayer: (name) =>
    set((state) => {
      const current = state.layersObj[name]
      const next = current === undefined ? false : !current // ← 初回は false にする
      return {
        layersObj: {
          ...state.layersObj,
          [name]: next,
        },
      }
    }),
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
