import { create } from "zustand"
import type { GeoJSONSourceSpecification } from "maplibre-gl"

// Zustandストアの型を定義
interface ICycleStationGeoJsonStore {
  helloCycleGeoJson: GeoJSONSourceSpecification | null
  docomoBikeShareGeoJson: GeoJSONSourceSpecification | null
  setHelloCycleGeoJson: (data: GeoJSONSourceSpecification) => void
  setDocomoBikeShareGeoJson: (data: GeoJSONSourceSpecification) => void
  getHelloCycleGeoJson: () => GeoJSONSourceSpecification | null
  getDocomoBikeShareGeoJson: () => GeoJSONSourceSpecification | null
}

// Zustandストアを作成
const useCycleGeoJsonStore = create<ICycleStationGeoJsonStore>((set, get) => ({
  // 初期値
  helloCycleGeoJson: null,
  docomoBikeShareGeoJson: null,

  // helloCycleGeoJsonを設定
  setHelloCycleGeoJson: (data) => set(() => ({ helloCycleGeoJson: data })),

  // docomoBikeShareGeoJsonを設定
  setDocomoBikeShareGeoJson: (data) => set(() => ({ docomoBikeShareGeoJson: data })),

  // helloCycleGeoJsonを取得
  getHelloCycleGeoJson: () => get().helloCycleGeoJson,

  // docomoBikeShareGeoJsonを取得
  getDocomoBikeShareGeoJson: () => get().docomoBikeShareGeoJson,
}))

export default useCycleGeoJsonStore
