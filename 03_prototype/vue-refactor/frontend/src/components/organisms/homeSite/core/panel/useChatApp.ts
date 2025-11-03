import type { IChatState } from "@/domain/interfaces/IChatState"
const useChatApp = (chatState: IChatState) => {
  const { getChatMessageList, getDataMessageLength } = chatState
  return {
    getChatMessageList,
    getDataMessageLength,
  }
}
export default useChatApp
