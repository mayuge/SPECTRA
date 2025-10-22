import type { ChatType } from "@/domain/types/chatType"
import { useReqChatApiAdapter } from "@/infrastructure/adapters/httpClientAdapters"
import { useDialogStateAdapter } from "@/infrastructure/adapters/storeAdapters"
import {
  useGeojsonStateStoreAdapter,
  useChatStateStoreAdapter,
} from "@/infrastructure/adapters/storeAdapters"

const useDialogApp = () => {
  const { sendChatMessage } = useReqChatApiAdapter()
  const { setGeojson } = useGeojsonStateStoreAdapter()
  const { getChatMessageList, addChatMessage } = useChatStateStoreAdapter()
  const { getMainPanelOpen, setMainPanelOpen } = useDialogStateAdapter()

  const manageChatMessage = async (message: string) => {
    // ✅ 空文字の時は何もしない
    if (!message.trim()) return

    // ✅ 記号の使用禁止（許可文字: 日本語・英数字・スペース・。、！？）
    const invalidCharPattern = /[^a-zA-Z0-9ぁ-んァ-ン一-龯々。、！？\s]/u
    if (invalidCharPattern.test(message)) {
      const errorMessage: ChatType = {
        type: "error",
        message: "記号は使用できません。日本語または英数字のみで入力してください。",
        isdata: false,
      }
      addChatMessage(errorMessage)
      return
    }

    // ✅ 文字数制限（例：最大300文字）
    if (message.length > 300) {
      const errorMessage: ChatType = {
        type: "error",
        message: "メッセージが長すぎます。300文字以内で入力してください。",
        isdata: false,
      }
      addChatMessage(errorMessage)
      return
    }

    // メッセージ送信後にメインパネルを開く
    setMainPanelOpen(true)

    // チャットメッセージを追加
    const chatMessage: ChatType = {
      type: "request",
      message,
      isdata: false,
    }
    addChatMessage(chatMessage)

    try {
      const responseStr = await sendChatMessage(message)

      if (responseStr) {
        const geojson = JSON.parse(responseStr)
        setGeojson(geojson)
        const successMessage: ChatType = {
          type: "response",
          message: `【表示結果】${message}`,
          isdata: true,
        }
        addChatMessage(successMessage)
      } else {
        const errorMessage: ChatType = {
          type: "error",
          message: "エラーです。分かりやすくリクエストすると成功率が高まります。",
          isdata: false,
        }
        addChatMessage(errorMessage)
      }
    } catch (error) {
      const errorMessage: ChatType = {
        type: "error",
        message: `Error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
        isdata: false,
      }
      addChatMessage(errorMessage)
    }
  }

  return {
    getMainPanelOpen,
    setMainPanelOpen,
    manageChatMessage,
    getChatMessageList,
  }
}

export default useDialogApp
