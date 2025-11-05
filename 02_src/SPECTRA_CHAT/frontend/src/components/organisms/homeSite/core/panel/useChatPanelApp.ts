import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IChatState } from "@/domain/interfaces/IChatState"

import type { DialogNameType } from "@/domain/types/dialogNameType"
import type { ChatType } from "@/domain/types/chatType"
import type { Feature, FeatureCollection } from "geojson"

const useChatPanelApp = (
  dialogState: IDialogState,
  reqChatApi: IReqChatApi,
  mapInstance: IMapInstance,
  mapLayer: IMapLayer,
  chatState: IChatState
) => {
  const { getDialogState, toggleDialogState } = dialogState
  const { sendChatMessage } = reqChatApi
  const { addGeoJsonLayer } = mapLayer
  const { getMapInstance } = mapInstance
  const { addChatMessage, getChatMessageList } = chatState
  /**
   * メインパネルの開閉状態
   */
  const getMainPanelOpen = () => {
    return getDialogState("mainPanel" as keyof DialogNameType)
  }

  /**
   * メインパネル切替
   */
  const toggleMainPanel = () => {
    toggleDialogState("mainPanel" as keyof DialogNameType)
  }

  /**
   * プルタブのアイコン
   */
  const getPullTabIcon = () => {
    return getDialogState("mainPanel" as keyof DialogNameType) ? "arrow_left" : "arrow_right"
  }

  /**
   * 送信ボタン押下
   */
  const submitButtonClicked = async (inputValue: string) => {
    const requestMessage: ChatType = {
      type: "request",
      message: inputValue,
      isdata: false,
    }

    addChatMessage(requestMessage)

    try {
      //メッセージをchatのapiへ送信
      const chatGeojson: Feature | FeatureCollection | null = await sendChatMessage(inputValue)

      // すべてのgeojsonをFeatureCollectionとみなし、データ型を定義
      let geojson: FeatureCollection
      if (chatGeojson.type === "FeatureCollection") {
        geojson = chatGeojson as FeatureCollection
      } else {
        geojson = { type: "FeatureCollection", features: [chatGeojson as Feature] }
      }

      const map = getMapInstance()

      if (map && map.loaded()) {
        addGeoJsonLayer(map, geojson)
      }

      const responseMessage: ChatType = {
        type: "response",
        message: `【表示結果】${inputValue}`,
        isdata: true,
      }

      addChatMessage(responseMessage)
    } catch (error) {
      const errorMessage: ChatType = { type: "error", message: error, isdata: false }
      addChatMessage(errorMessage)
    }
  }

  return {
    getMainPanelOpen,
    toggleMainPanel,
    getPullTabIcon,
    submitButtonClicked,
  }
}
export default useChatPanelApp
