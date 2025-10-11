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

  const manageChatMessage = async (message: string) => {
    // メッセージ送信後にメインパネルを開く
    setMainPanelOpen(true)
    // チャットメッセージを追加
    const chatMessage: ChatType = {
      type: "request",
      message,
      isdata: false,
    }
    addChatMessage(chatMessage)
    console.log(getChatMessageList())
    try {
      const responseStr = await sendChatMessage(message)

      if (responseStr) {
        // 文字列化された JSON をオブジェクトに変換
        const geojson = JSON.parse(responseStr)
        setGeojson(geojson)
        const successMessage: ChatType = {
          type: "response",
          message: "表示しました",
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

  const { getMainPanelOpen, setMainPanelOpen } = useDialogStateAdapter()
  return {
    getMainPanelOpen,
    setMainPanelOpen,
    manageChatMessage,
    getChatMessageList,
  }
}
export default useDialogApp
