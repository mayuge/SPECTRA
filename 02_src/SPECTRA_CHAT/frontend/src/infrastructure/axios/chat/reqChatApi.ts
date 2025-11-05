import { getInstance } from "@/infrastructure/axios/api"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"

const useReqChatApi = (): IReqChatApi => {
  const httpInstance = getInstance()

  const sendChatMessage = async (message: string) => {
    const url = import.meta.env.VITE_CHAT_URL
    const config = {
      method: "POST",
      url: url,
      data: { message },
    }

    const res = await httpInstance.request(config)

    if (res.status === 200) {
      // 文字列ならJSON.parseする
      console.log(res.data.response)
      const data =
        typeof res.data.response === "string" ? JSON.parse(res.data.response) : res.data.response
      return data
    } else {
      throw new Error("Failed to send chat message")
    }
  }

  return { sendChatMessage }
}

export default useReqChatApi
