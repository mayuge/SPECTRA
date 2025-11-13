import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPlugin } from "@/domain/interfaces/IMapPlugin"

const useMapApp = (mapInstance: IMapInstance, useMapPlugin: IMapPlugin) => {
  const { getMapInstance } = mapInstance
  const { setAllPlugins } = useMapPlugin

  /**
   * マウント時のコールバック
   */
  const onMountedCallback = () => {
    getMapInstance()
    setAllPlugins()
  }

  return {
    onMountedCallback,
  }
}
export default useMapApp
