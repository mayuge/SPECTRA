import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"

export const useLayerControlApp = () => {
  const { toggleDisplayLayer, getDisplayLayer } = useDisplayLayerStore()

  // UIで使うtoggle関数
  const toggleTrainLayer = () => {
    toggleDisplayLayer("trainLine")
    toggleDisplayLayer("train")
  }

  return {
    toggleTrainLayer,
    getDisplayLayer,
  }
}
