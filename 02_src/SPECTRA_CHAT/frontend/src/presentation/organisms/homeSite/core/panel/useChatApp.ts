import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"

/**
 * チャットアプリ全体を管理するコアロジック
 * @source
 */
const useChatApp = (chatState: IChatState, mapLayer: IMapLayer) => {
  const { getChatMessageList } = chatState
  const { toggleLayer, frontToLayer, backToLayer } = mapLayer

  /**
   * 連番のidからgeojsonレイヤーを特定し、トグルする
   * @param index number
   */
  const toggleResponseLayer = (index: number) => {
    const layerId = `geojson-layer-${index}`
    toggleLayer(layerId)
  }

  /**
   * 連番のidからgeojsonレイヤーを特定し、前面に移動
   * @param index number
   */
  const frontToResponseLayer = (index: number) => {
    const layerId = `geojson-layer-${index}`
    console.log(layerId)
    frontToLayer(layerId)
  }
  /**
   * 連番のidからgeojsonレイヤーを特定し、背面に移動
   * @param index number
   */
  const backToResponseLayer = (index: number) => {
    const layerId = `geojson-layer-${index}`
    backToLayer(layerId)
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
    frontToResponseLayer,
    backToResponseLayer,
  }
}

export default useChatApp
