import type { ICustomLayerState } from "@/domain/interfaces/ICustomLayerState"
import type { CustomLayerNameType } from "@/domain/types/customLayerNameType"
import type { FeatureCollection } from "geojson"

import { defineStore } from "pinia"
import { ref } from "vue"

export const useCustomLayerStore = defineStore<"customLayerStateStore", ICustomLayerState>(
  "customLayerStateStore",
  () => {
    const customLayerGeojson = ref<{ [key in CustomLayerNameType]: FeatureCollection }>({
      "train-station-layer": {
        type: "FeatureCollection",
        features: [],
      },
      "train-line-layer": {
        type: "FeatureCollection",
        features: [],
      },
      "hello-cycle-layer": {
        type: "FeatureCollection",
        features: [],
      },
      "docomo-bike-share-layer": {
        type: "FeatureCollection",
        features: [],
      },
    })

    const setCustomLayerGeojson = (
      customLayerName: keyof CustomLayerNameType,
      geojson: FeatureCollection
    ) => {
      customLayerGeojson.value[customLayerName] = geojson
    }

    const getCustomLayerGeojson = (customLayerName: keyof CustomLayerNameType) => {
      return customLayerGeojson.value[customLayerName]
    }

    return {
      setCustomLayerGeojson,
      getCustomLayerGeojson,
    }
  }
)
