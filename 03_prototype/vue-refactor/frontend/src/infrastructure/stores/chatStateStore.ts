import type { ChatType } from "@/domain/types/chatType"
import type { IChatState } from "@/domain/interfaces/IChatState"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useChatStateStore = defineStore<"chatStateStore", IChatState>("chatStateStore", () => {
  const chatMessage = ref<ChatType[]>([])

  const getChatMessageList = () => {
    return chatMessage.value
  }

  const addChatMessage = (message: ChatType) => {
    chatMessage.value.push(message)
  }

  const getDataMessageLength = () => {
    return chatMessage.value.filter((message) => message.isdata).length
  }

  return {
    getChatMessageList,
    addChatMessage,
    getDataMessageLength,
  }
})
