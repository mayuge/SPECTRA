import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"

const useChatApp = (chatState: IChatState, mapInstance: IMapInstance, mapLayer: IMapLayer) => {
  const { getChatMessageList } = chatState
  const { getMapInstance } = mapInstance
  const { toggleLayer } = mapLayer

  const toggleResponseLayer = (index: number) => {
    const map = getMapInstance()
    const layerId = `geojson-layer-${index}`
    console.log("toggle", layerId)
    toggleLayer(map, layerId)
  }

  /**
   * response の通し番号を返す純粋関数
   * @param index number
   */
  const getResponseIndex = (index: number): number => {
    const messages = getChatMessageList()
    let counter = 0
    for (let i = 0; i <= index; i++) {
      const msg = messages[i]
      if (msg.isdata || msg.type === "response") {
        counter++
      }
    }
    return counter - 1
  }

  return {
    getChatMessageList,
    getResponseIndex,
    toggleResponseLayer,
  }
}

export default useChatApp
