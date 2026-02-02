import type { IMapPopulationMeshLayer } from "@/domain/interfaces/IMapPopulationMeshLayer"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { ILoadingState } from "@/domain/interfaces/ILoadingState"

import useMapInstance from "@/infrastructure/map/mapInstance"
import { useLoadingStateStore } from "@/infrastructure/stores/loadingStateStore"
import { ref } from "vue"

import { MapboxOverlay } from "@deck.gl/mapbox"
import { MVTLayer } from "deck.gl"

import { POPULATION_MESH_LAYER } from "@/domain/params/customLayerName"

/**
 * 人口メッシュ（MVT）の Deck.gl レイヤーを MapLibre に追加・制御するカスタムフック。
 *
 * - ズームレベルに応じて Deck.gl Overlay を ON/OFF
 * - 外部から ON/OFF 切替（togglePopulationMeshLayer）
 * - 初期化時にレイヤー生成
 *
 * @returns IMapPopulationMeshLayer
 */
const useMapPopulationLayer = (): IMapPopulationMeshLayer => {
  /** MapLibre インスタンス */
  const { getMapInstance } = useMapInstance() as IMapInstance
  const { getIsLoading } = useLoadingStateStore() as ILoadingState

  const mapInstance = getMapInstance()

  /** レイヤーの表示状態（true = 表示 / false = 非表示） */
  const populationMeshLayerVisibility = ref<boolean>(false)

  /** Deck.gl Overlay インスタンス */
  let overlay: MapboxOverlay | null = null

  /** ズーム時に実行する Overlay 更新処理 */
  let updateOverlay: (() => void) | null = null

  /**
   * Population Mesh Layer の表示状態を切り替える
   *
   * @remarks
   * - 内部の visibility フラグを反転
   * - updateOverlay() を呼び出し即時反映
   */
  const togglePopulationMeshLayer = (): void => {
    if (getIsLoading()) {
      return
    }
    populationMeshLayerVisibility.value = !populationMeshLayerVisibility.value
    if (updateOverlay) updateOverlay()
  }

  /**
   * Population Mesh Layer の現在の表示状態を返す
   *
   * @returns boolean 表示中かどうか
   */
  const getPopulationMeshLayerVisibility = (): boolean => {
    return populationMeshLayerVisibility.value
  }

  /**
   * Deck.gl Population Mesh Overlay を作成
   *
   * @returns MapboxOverlay Deck.gl Overlay インスタンス
   */
  const createPopulationMeshOverlay = (): MapboxOverlay => {
    return new MapboxOverlay({
      interleaved: true,
      layers: [
        new MVTLayer({
          id: POPULATION_MESH_LAYER,
          data: "https://tiles.kmproj.com/jp_estat_mesh_2020.json",
          tileSize: 512,
          extruded: true,
          pickable: true,

          /**
           * 塗りつぶし色
           */
          getFillColor: (f) => {
            const population = parseInt(f.properties?.["人口（総数）"] || "0")
            if (population > 30000) return [255, 0, 0, 80]
            if (population > 15000) return [255, 69, 0, 80]
            if (population > 8000) return [255, 140, 0, 80]
            if (population > 5000) return [255, 165, 0, 80]
            if (population > 3000) return [255, 191, 0, 80]
            if (population > 2000) return [255, 215, 0, 80]
            if (population > 1000) return [255, 255, 0, 80]
            return [100, 100, 100, 20]
          },

          /**
           * 標高（3D高さ）
           */
          getElevation: (f) => {
            const population = parseInt(f.properties?.["人口（総数）"] || "0")
            //高すぎるので2で割る
            return population / 2
          },

          parameters: {
            depthTest: false, // 奥に沈まないように
          },

          loadOptions: {
            fetch: {
              retries: 3,
              maxRetryDelay: 1000,
              maxConcurrency: 4,
            },
          },
        }),
      ],
    })
  }

  /**
   * 人口メッシュレイヤーを MapLibre に追加する。
   *
   * @remarks
   * - ズーム 10 以上で表示
   * - ズーム未満で overlay を remove
   * - updateOverlay を zoom イベントに登録
   */
  const addPopulationMeshLayer = (): void => {
    updateOverlay = () => {
      const zoom = mapInstance.getZoom()

      // ON 条件
      if (populationMeshLayerVisibility.value && zoom >= 5 && !overlay) {
        overlay = createPopulationMeshOverlay()
        mapInstance.addControl(overlay)
      }

      // OFF 条件
      if ((!populationMeshLayerVisibility.value || zoom < 5) && overlay) {
        mapInstance.removeControl(overlay)
        overlay = null
      }
    }

    // ズームイベントに登録
    mapInstance.on("zoom", updateOverlay)
    updateOverlay() // 初期状態で反映
  }

  return {
    addPopulationMeshLayer,
    togglePopulationMeshLayer,
    getPopulationMeshLayerVisibility,
  }
}

export default useMapPopulationLayer
