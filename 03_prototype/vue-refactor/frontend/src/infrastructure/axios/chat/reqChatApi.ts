import { getInstance } from "@/infrastructure/axios/api"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"
import type { Feature, Geometry } from "geojson"

const useReqChatApi = (): IReqChatApi => {
  const httpInstance = getInstance()

  const sendChatMessage = async (
    message: string
  ): Promise<Feature<Geometry, { [key: string]: any }>> => {
    const url = import.meta.env.VITE_CHAT_URL

    const res = await httpInstance.post(url, { message })

    if (res.status === 200) {
      // 文字列で返ってくる場合は JSON.parse
      const feature: Feature<Geometry, { [key: string]: any }> =
        typeof res.data.response === "string" ? JSON.parse(res.data.response) : res.data.response
      return feature
    } else {
      throw new Error("Failed to send chat message")
    }
  }

  return { sendChatMessage }
}

export default useReqChatApi
