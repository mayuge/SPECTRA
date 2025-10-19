import { create } from "zustand"
import type { ChatType } from "@/domain/types/chatType"
import type { IChatState } from "@/domain/interfaces/IChatState"

const useChatStateStore = create<IChatState>((set, get) => ({
  chatMessages: [],

  // チャットメッセージ一覧を取得
  getChatMessageList: () => get().chatMessages,

  // チャットメッセージを追加
  addChatMessage: (message: ChatType) => {
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    }))
  },

  // isData が true のメッセージ数を取得
  getDataMessageLength: () => {
    return get().chatMessages.filter((msg) => msg.isdata).length
  },
}))

export default useChatStateStore
