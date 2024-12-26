import { create } from "zustand"
import { cardLayerList } from "@/components/organisms/viewSite/core/params/layers"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"

import { persist, createJSONStorage } from "zustand/middleware"

interface ManageLayerState {
  layerList: CardListType[]
  getLayers: () => LayerType[]
  getCardList: () => CardListType[]
  changeLayerOrder: (index: number) => void
  getIsDisplayLayer: (index: number) => boolean
  setIsDisplayLayer: (index: number) => void
}

// Zustandストアの作成
const useManageLayerStateStore = create<ManageLayerState>()((set, get) => ({
  layerList: cardLayerList,
  getLayers: () =>
    get()
      .layerList.map((card) => card.layer)
      .reverse(),
  getCardList: () => get().layerList,
  changeLayerOrder: (index: number) => {
    set((state) => {
      const newLayerList = [...state.layerList]
      //最後の配列でなければ、配列を入れ替える
      if (index < newLayerList.length - 1) {
        const temp = newLayerList[index]
        newLayerList[index] = newLayerList[index + 1]
        newLayerList[index + 1] = temp
      }
      return { layerList: newLayerList }
    })
  },
  getIsDisplayLayer: (index: number) => get().layerList[index].isDisplayLayer,
  setIsDisplayLayer: (index: number) => {
    set((state) => {
      //isDisplayLayerを反転させる
      const newLayerList = [...state.layerList]
      newLayerList[index].isDisplayLayer = !newLayerList[index].isDisplayLayer
      //layerのvisibilityを変更する
      newLayerList[index].layer.layout!.visibility = newLayerList[index].isDisplayLayer ? "visible" : "none"
      return { layerList: newLayerList }
    })
  },
}))

export default useManageLayerStateStore
