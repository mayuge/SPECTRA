import { useReqChatApiAdapter } from "@/infrastructure/adapters/httpAdapter"
import { useDialogStateAdapter } from "@/infrastructure/adapters/storeAdapters"
import { useGeojsonStateStoreAdapter } from "@/infrastructure/adapters/storeAdapters"
const useDialogApp = () => {
  const { sendChatMessage } = useReqChatApiAdapter()
  const { setGeojson, getGeojson } = useGeojsonStateStoreAdapter()
  const manageChatMessage = async (message: string) => {
    try {
      const responseStr = await sendChatMessage(message)

      if (responseStr) {
        // 文字列化された JSON をオブジェクトに変換
        const geojson = JSON.parse(responseStr)
        setGeojson(geojson)

        console.log("store GeoJSON:", getGeojson())
      } else {
        console.warn("No data received or unexpected format:", responseStr)
      }
    } catch (error) {
      console.error("Error sending chat message:", error)
      throw error
    }
  }

  const { getMainPanelOpen, setMainPanelOpen } = useDialogStateAdapter()
  return {
    getMainPanelOpen,
    setMainPanelOpen,
    manageChatMessage,
  }
}
export default useDialogApp
