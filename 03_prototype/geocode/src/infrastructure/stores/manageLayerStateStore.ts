import { create } from "zustand"
import { walkModeCardLayerList } from "@/components/organisms/viewSite/core/params/walkMode/useWalkLayersMain"
import { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { LayerType } from "@/components/organisms/viewSite/core/types/layerType"
import {
  FillLayerSpecification,
  LineLayerSpecification,
  RasterLayerSpecification,
  CircleLayerSpecification,
} from "maplibre-gl"

interface ManageLayerState {
  layerList: CardListType[]
  getLayers: () => LayerType[]
  getCardList: () => CardListType[]
  setCardList: (cardList: CardListType[]) => void
  changeLayerOrder: (index: number) => void
  getIsDisplayLayer: (index: number) => boolean
  setIsDisplayLayer: (index: number) => void
  setOpacity: (index: number, value: number) => void
}

// Zustandストアの作成
const useManageLayerStateStore = create<ManageLayerState>()((set, get) => ({
  layerList: walkModeCardLayerList,
  setCardList: (cardList: CardListType[]) => {
    set(() => ({
      layerList: cardList, // 新しい状態オブジェクトを返す
    }))
  },
  getCardList: () => get().layerList,
  getLayers: () =>
    get()
      .layerList.map((card) => card.layer)
      .reverse(),

  changeLayerOrder: (index: number) => {
    set((state) => {
      const newLayerList = [...state.layerList]
      // 最後の配列でなければ、配列を入れ替える
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
      // isDisplayLayerを反転させる
      const newLayerList = [...state.layerList]
      newLayerList[index].isDisplayLayer = !newLayerList[index].isDisplayLayer
      // layerのvisibilityを変更する
      newLayerList[index].layer.layout!.visibility = newLayerList[index].isDisplayLayer
        ? "visible"
        : "none"
      return { layerList: newLayerList }
    })
  },
  setOpacity: (index: number, value: number) => {
    set((state) => {
      const newLayerList = [...state.layerList]
      const layer = newLayerList[index].layer

      // paint プロパティが undefined の場合に対応
      if ("paint" in layer && layer.paint) {
        // Fill Layer
        if (layer.type === "fill") {
          const paint = layer.paint as FillLayerSpecification["paint"]
          if (paint) paint["fill-opacity"] = value
        }
        // Line Layer
        else if (layer.type === "line") {
          const paint = layer.paint as LineLayerSpecification["paint"]
          if (paint) paint["line-opacity"] = value
        }
        // Raster Layer
        else if (layer.type === "raster") {
          const paint = layer.paint as RasterLayerSpecification["paint"]
          if (paint) paint["raster-opacity"] = value
        }
        // Circle Layer
        else if (layer.type === "circle") {
          const paint = layer.paint as CircleLayerSpecification["paint"]
          if (paint) paint["circle-opacity"] = value
        }
        // Fill-Extrusion Layer
        else if (layer.type === "fill-extrusion") {
          const paint = layer.paint as FillLayerSpecification["paint"]
          if (paint && "fill-extrusion-opacity" in paint) {
            paint["fill-extrusion-opacity"] = value
          }
        }
      }
      return { layerList: newLayerList }
    })
  },
}))

export default useManageLayerStateStore
