import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"

/**
 * チャットアプリ全体を管理するコアロジック
 * @source
 */
const useChatApp = (chatState: IChatState, mapLayer: IMapLayer) => {
  const { getChatMessageList } = chatState
  const { toggleLayer } = mapLayer

  /**
   * 連番のidからgeojsonレイヤーを特定し、トグルする
   * @param index number
   */
  const toggleResponseLayer = (index: number) => {
    const layerId = `geojson-layer-${index}`
    toggleLayer(layerId)
  }

  /**
   * response の通し番号を取得
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
