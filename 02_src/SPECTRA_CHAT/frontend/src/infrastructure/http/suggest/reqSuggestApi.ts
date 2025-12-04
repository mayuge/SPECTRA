import { getInstance } from "@/infrastructure/http/api"
import type { IReqSuggestApi } from "@/domain/interfaces/IReqSuggestApi.ts"
export const useReqSuggestApi = (): IReqSuggestApi => {
  const httpInstance = getInstance()

  /**
   * サジェスト欄の情報を取得しリクエストする
   * @returns {geojson}
   */
  const getSuggestData = async (url: string) => {
    const config = {
      method: "GET",
      url: `${url}`,
    }
    const res = await httpInstance.request(config)
    if (res.status === 200) {
      return typeof res.data === "string" ? JSON.parse(res.data) : res.data
    } else {
      throw new Error("Failed to fetch station data")
    }
  }

  return {
    getSuggestData,
  }
}

export default useReqSuggestApi
