import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPlugin } from "@/domain/interfaces/IMapPlugin"

/**
 * 地図本体のみを管理するコアロジック `地図ライブラリを変更しても影響を受けにくくする`
 * @source
 */
const useMapApp = (mapInstance: IMapInstance, useMapPlugin: IMapPlugin) => {
  const { getMapInstance } = mapInstance
  const { setAllPlugins } = useMapPlugin

  /**
   * マウント時にマップインスタンスとプラグインを初期化
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
