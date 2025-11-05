import { defineStore } from "pinia"
import { ref } from "vue"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"
import type { FeatureCollection } from "geojson"

export const useGeojsonStateStore = defineStore<"geojsonStateStore", IGeojsonState>(
  "geojsonStateStore",
  () => {
    const geojsonList = ref<FeatureCollection[]>([])

    const setGeojson = (geojson: FeatureCollection) => {
      geojsonList.value.push(geojson)
    }

    const getLastGeojson = () => {
      return geojsonList.value[geojsonList.value.length - 1]
    }

    return {
      setGeojson,
      getLastGeojson,
    }
  }
)
