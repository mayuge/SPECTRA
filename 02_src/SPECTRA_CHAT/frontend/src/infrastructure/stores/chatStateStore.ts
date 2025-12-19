import type { ChatType } from "@/domain/types/chatType"
import type { IChatState } from "@/domain/interfaces/IChatState"
import { defineStore } from "pinia"
import { ref } from "vue"

const CHAT_HISTORY_KEY = "chatHistory"

export const useChatStateStore = defineStore<"chatStateStore", IChatState>("chatStateStore", () => {
  /**
   * チャットメッセージ一覧（UI 表示用）
   * - request / response を含む
   */
  const chatMessage = ref<ChatType[]>([])

  /**
   * チャットメッセージ一覧を取得する
   *
   * @returns チャットメッセージ配列
   */
  const getChatMessageList = (): ChatType[] => {
    return chatMessage.value
  }

  /**
   * チャットメッセージを追加する
   *
   * - store には常に全メッセージを追加
   * - `type === "request"` の場合のみ
   *   message（string）を chatHistory として localStorage に保存する
   *
   * @param message 追加するチャットメッセージ
   */
  const addChatMessage = (message: ChatType): void => {
    chatMessage.value.push(message)

    if (message.type === "request") {
      saveChatHistoryMessage(message.message)
    }
  }

  /**
   * `isdata === true` のメッセージ数を取得する
   *
   * @returns データメッセージ件数
   */
  const getDataMessageLength = (): number => {
    return chatMessage.value.filter((message) => message.isdata).length
  }

  /**
   * request メッセージの内容（string）のみを
   * chatHistory として localStorage に保存する
   *
   * - 配列の先頭に追加（最新が先頭）
   *
   * @param text 保存するリクエストメッセージ
   */
  const saveChatHistoryMessage = (text: string): void => {
    const history = getChatHistory()
    history.unshift(text)

    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history))
  }

  /**
   * chatHistory を localStorage から一括取得する
   *
   * @returns request メッセージ文字列配列
   */
  const getChatHistory = (): string[] => {
    const raw = localStorage.getItem(CHAT_HISTORY_KEY)
    if (!raw) return []

    try {
      return JSON.parse(raw) as string[]
    } catch {
      localStorage.removeItem(CHAT_HISTORY_KEY)
      return []
    }
  }

  return {
    getChatMessageList,
    addChatMessage,
    getDataMessageLength,
    getChatHistory,
  }
})
