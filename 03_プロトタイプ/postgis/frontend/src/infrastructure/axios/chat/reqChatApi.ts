import { getInstance } from "@/infrastructure/axios/api"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"

const useReqTrainApi = (): IReqChatApi => {
  const httpInstance = getInstance()
  /**
   * チャットメッセージを送信
   * @param message {string} 送信するメッセージ
   * @returns {Promise<any>} サーバーからの応答
   */
  const sendChatMessage = async (message: string) => {
    console.log("Sending chat message:", message)
    const url = process.env.NEXT_PUBLIC_CHAT_URL
    const config = {
      method: "POST",
      url: `${url}`,
      data: { message },
    }

    const chatResponse = await httpInstance.request(config)

    const responseConfig = {
      method: "GET",
      url: chatResponse.data[0],
    }
    const res = await httpInstance.request(responseConfig)
    console.log("Received response:", res.data)

    if (res.status === 200) {
      return typeof res.data === "string" ? JSON.parse(res.data) : res.data
    } else {
      throw new Error("Failed to send chat message")
    }
  }

  return { sendChatMessage }
}

export default useReqTrainApi
