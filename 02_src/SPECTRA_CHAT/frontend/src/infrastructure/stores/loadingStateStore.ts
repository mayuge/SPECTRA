import type { ILoadingState } from "@/domain/interfaces/ILoadingState"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useLoadingStateStore = defineStore<"loadingStateStore", ILoadingState>(
  "loadingStateStore",
  () => {
    const isLoading = ref<boolean>(false)

    /**
     * ローディンク開始
     */
    const startLoading = () => {
      isLoading.value = true
    }

    /**
     * ローディング終了
     */
    const stopLoading = () => {
      isLoading.value = false
    }

    /**
     * ローディング状態を取得
     * @returns boolean ローディング状態
     */
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
