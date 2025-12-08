import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"

/**
 * チャットアプリ全体を管理するコアロジック
 * @source
 */
const useChatApp = (chatState: IChatState, mapLayer: IMapLayer, geojsonState: IGeojsonState) => {
  const { getChatMessageList } = chatState
  const { toggleLayer, frontToLayer, backToLayer, setLayerOpacity, setLayerColor } = mapLayer
  const { getGeojsonColorbyIndex } = geojsonState
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
    console.log(layerId)
    backToLayer(layerId)
  }

  /**
   * 透明度をレイヤーidで指定
   * @param index
   */
  const setOpacityByIndex = (index: number, opacity: number) => {
    const layerId = `geojson-layer-${index}`
    setLayerOpacity(layerId, opacity)
  }

  /**
   * レイヤー色をレイヤーidで指定
   * @params index
   */
  const setColorByIndex = (index: number, color: string) => {
    const layerId = `geojson-layer-${index}`
    console.log(layerId, color)
    setLayerColor(layerId, color)
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
    setOpacityByIndex,
    setColorByIndex,
    getGeojsonColorbyIndex,
  }
}

export default useChatApp
