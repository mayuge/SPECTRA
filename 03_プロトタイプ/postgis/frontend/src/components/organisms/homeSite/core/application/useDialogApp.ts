import { useReqChatApiAdapter } from "@/infrastructure/adapters/httpAdapter"
import { useDialogStateAdapter } from "@/infrastructure/adapters/storeAdapters"
const useDialogApp = () => {
  const { sendChatMessage } = useReqChatApiAdapter()
  const { getMainPanelOpen, setMainPanelOpen } = useDialogStateAdapter()
  return {
    sendChatMessage,
    getMainPanelOpen,
    setMainPanelOpen,
  }
}
export default useDialogApp
