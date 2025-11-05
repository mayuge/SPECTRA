import { ChatType } from "@/domain/types/chatType"

export interface IChatState {
  // チャットメッセージのリスト
  chatMessages: ChatType[]
  // チャットメッセージのゲッター
  getChatMessageList: () => ChatType[]
  // チャットメッセージを追加する関数
  addChatMessage: (message: ChatType) => void
  // isDataがtrueのメッセージをフィルタリングし、lengthを取得する
  getDataMessageLength: () => number
}
