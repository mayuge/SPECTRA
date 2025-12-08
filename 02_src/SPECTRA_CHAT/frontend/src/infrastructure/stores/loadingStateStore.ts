import type { ILoadingState } from "@/domain/interfaces/ILoadingState"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useLoadingStateStore = defineStore<"loadingStateStore", ILoadingState>(
  "loadingStateStore",
  () => {
    const isLoading = ref<boolean>(false)

    const startLoading = () => {
      isLoading.value = true
    }
    const stopLoading = () => {
      isLoading.value = false
    }
    const getIsLoading = () => {
      return isLoading.value
    }
    return {
      startLoading,
      stopLoading,
      getIsLoading,
    }
  }
)
