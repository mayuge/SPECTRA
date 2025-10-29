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

    const res = await httpInstance.request(config)

    console.log("Response from chat API:", res.data.response)

    if (res.status === 200) {
      // res.data がすでにオブジェクトである前提ならこのままでOK
      console.log("Response from chat API:", res.data.response)
      return res.data.response
    } else {
      throw new Error("Failed to send chat message")
    }
  }

  return { sendChatMessage }
}

export default useReqTrainApi
