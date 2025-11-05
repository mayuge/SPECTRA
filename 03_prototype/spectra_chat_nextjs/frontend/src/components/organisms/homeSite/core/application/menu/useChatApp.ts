import { useDisplayLayerStoreAdapter } from "@/infrastructure/adapters/storeAdapters"
const useChatApp = () => {
  const { toggleDisplayLayer, getDisplayLayer } = useDisplayLayerStoreAdapter()
  return {
    toggleDisplayLayer,
    getDisplayLayer,
  }
}
export default useChatApp
