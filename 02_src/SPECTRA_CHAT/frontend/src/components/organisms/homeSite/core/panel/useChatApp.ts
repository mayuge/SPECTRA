import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"

const useChatApp = (chatState: IChatState, mapLayer: IMapLayer) => {
  const { getChatMessageList } = chatState
  const { toggleLayer } = mapLayer

  const toggleResponseLayer = (index: number) => {
    const layerId = `geojson-layer-${index}`
    toggleLayer(layerId)
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
