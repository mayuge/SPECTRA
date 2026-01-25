import { defineStore } from "pinia"
import { ref } from "vue"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"
import type { FeatureCollection } from "geojson"

export const useGeojsonStateStore = defineStore<"geojsonStateStore", IGeojsonState>(
  "geojsonStateStore",
  () => {
    /** GeoJSON のリスト */
    const geojsonList = ref<FeatureCollection[]>([])

    /** 各 GeoJSON に対応する色のリスト */
    const geojsonColorList = ref<string[]>([])

    /**
     * GeoJSON を追加する
     * @param geojson 追加する GeoJSON
     */
    const setGeojson = (geojson: FeatureCollection) => {
      geojsonList.value.push(geojson)
    }

    /**
     * 最後に追加された GeoJSON を取得する
     * @returns 最後の GeoJSON
     */
    const getLastGeojson = () => {
      return geojsonList.value[geojsonList.value.length - 1]
    }

    /**
     * 色を追加する
     * @param color 追加する色
     */
    const setColor = (color: string) => {
      geojsonColorList.value.push(color)
    }

    /**
     * 指定されたindexの色を取得
     * @param index 取得したい色のインデックス
     * @returns string | undefined
     */
    const getGeojsonColorbyIndex = (index: number) => {
      return geojsonColorList.value[index] ?? "#808080"
    }

    /**
     * 指定されたindexのGeoJSONを取得
     * @param index 取得したいGeoJSONのインデックス
     * @return FeatureCollection | null
     */
    const getGeojsonByIndex = (index: number) => {
      return geojsonList.value[index] ?? null
    }

    return {
      setGeojson,
      getLastGeojson,
      setColor,
      getGeojsonColorbyIndex,
      getGeojsonByIndex,
    }
  }
)
