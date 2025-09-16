import { create } from "zustand"
import { IDisplayLayerState } from "@/domain/interfaces/IDisplayLayerState"

const useDisplayLayerStore = create<IDisplayLayerState>((set) => ({
  layersObj: {
    osm: true,
    satellite: false,
    floodHazard: true,
    train: true,
    plateau: false,
    trainLine: true,
  },
  toggleDisplayLayer: (DisplayLayerName) =>
    set((state) => ({
      layersObj: {
        ...state.layersObj,
        [DisplayLayerName]: !state.layersObj[DisplayLayerName],
      },
    })),
}))

export default useDisplayLayerStore
