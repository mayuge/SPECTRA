import { useDisplayLayerStoreAdapter } from "@/infrastructure/adapters/storeAdapters"

export const useLayerControlApp = () => {
  const { toggleDisplayLayer, getDisplayLayer } = useDisplayLayerStoreAdapter()

  // UIで使うtoggle関数
  const toggleTrainLayer = () => {
    toggleDisplayLayer("base-train-line-layer")
    toggleDisplayLayer("base-train-station-layer")
  }
  const toggleCycleLayer = () => {
    toggleDisplayLayer("hello-cycle-station-layer")
    toggleDisplayLayer("docomo-bike-share-station-layer")
  }

  return {
    toggleTrainLayer,
    toggleCycleLayer,
    getDisplayLayer,
  }
}
