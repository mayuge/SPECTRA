import { useState } from "react"
import type { ChatType } from "@/domain/types/chatType"
import type { IChatState } from "@/domain/interfaces/IChatState"

const useChatStateStore = (): IChatState => {
  const [chatMessages, setChatMessages] = useState<ChatType[]>([])

  // チャットメッセージのゲッター
  const getChatMessageList = (): ChatType[] => chatMessages

  // チャットメッセージを追加する関数
  const addChatMessage = (message: ChatType): void => {
    setChatMessages((prev) => [...prev, message])
  }

  // isDataがtrueのメッセージをフィルタリングし、lengthを取得する
  const getDataMessageLength = (): number => {
    return chatMessages.filter((msg) => msg.isdata).length
  }

  return {
    chatMessages,
    getChatMessageList,
    addChatMessage,
    getDataMessageLength,
  }
}
export default useChatStateStore
