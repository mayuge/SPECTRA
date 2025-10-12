import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"

export const useLayerControlApp = () => {
  const { toggleDisplayLayer, getDisplayLayer } = useDisplayLayerStore()

  // UIで使うtoggle関数
  const toggleTrainLayer = () => {
    toggleDisplayLayer("base-train-line-layer")
    toggleDisplayLayer("base-train-station-layer")
  }

  return {
    toggleTrainLayer,
    getDisplayLayer,
  }
}
