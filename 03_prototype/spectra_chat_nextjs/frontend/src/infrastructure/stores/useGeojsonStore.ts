import { create } from "zustand"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"
import type { AllGeoJsonType } from "@/domain/types/geoJsonType"

// Geojsonを管理するストア
const useGeojsonStateStore = create<IGeojsonState>()((set, get) => ({
  // 管理するGeojsonのリスト
  geojsonList: [],

  // リストの最後に追加する
  setGeojson: (geojson: AllGeoJsonType) =>
    set((state) => ({
      geojsonList: [...state.geojsonList, geojson],
    })),

  // ゲッター
  getGeojson: () => get().geojsonList,
}))

export default useGeojsonStateStore
