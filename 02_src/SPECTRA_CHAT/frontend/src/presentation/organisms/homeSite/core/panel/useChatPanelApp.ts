import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"
import type { IReqSuggestApi } from "@/domain/interfaces/IReqSuggestApi"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"

import type { DialogNameType } from "@/domain/types/dialogNameType"
import type { ChatType } from "@/domain/types/chatType"
import type { SuggestType } from "@/domain/types/suggestType"
import type { Feature, FeatureCollection } from "geojson"

/**
 * チャットパネル内を管理するコアロジック
 * @source
 */

const useChatPanelApp = (
  dialogState: IDialogState,
  reqChatApi: IReqChatApi,
  reqSuggestApi: IReqSuggestApi,
  mapLayer: IMapLayer,
  chatState: IChatState,
  geojsonState: IGeojsonState
) => {
  const { getDialogState, setDialogState, toggleDialogState } = dialogState
  const { sendChatMessage } = reqChatApi
  const { getSuggestData } = reqSuggestApi
  const { addGeoJsonLayer } = mapLayer
  const { addChatMessage, getChatMessageList } = chatState
  const { setGeojson, getLastGeojson } = geojsonState

  /**
   * メインパネルの開閉状態取得
   */
  const getMainPanelOpen = () => {
    return getDialogState("mainPanel" as keyof DialogNameType)
  }

  /**
   * メインパネルを開く
   */
  const openMainPanel = () => {
    setDialogState("mainPanel" as keyof DialogNameType, true)
  }

  /**
   * メインパネル切替
   */
  const toggleMainPanel = () => {
    toggleDialogState("mainPanel" as keyof DialogNameType)
  }

  /**
   * プルタブのアイコンを取得
   * @returns "arrow_left" | "arrow_right"
   */
  const getPullTabIcon = () => {
    return getDialogState("mainPanel" as keyof DialogNameType) ? "arrow_left" : "arrow_right"
  }

  /**
   * 何もチャットを送っていない状態ならconceptDisplayを表示
   */
  const isBlankChat = () => {
    if (getChatMessageList().length === 0) {
      return true
    }
    return false
  }

  const suggestButtonClicked = async (suggest: SuggestType) => {
    const url = suggest.url
    const message = suggest.text
    // メッセージ送信後にメインパネルを開く
    openMainPanel()
    const suggestMessage: ChatType = {
      type: "request",
      message: message,
      isdata: false,
    }
    addChatMessage(suggestMessage)
    try {
      console.log(url)
      const suggestGeojson: Feature | FeatureCollection | null = await getSuggestData(url)
      // すべてのgeojsonをFeatureCollectionとみなし、データ型を定義
      let geojson: FeatureCollection
      if (suggestGeojson.type === "FeatureCollection") {
        geojson = suggestGeojson as FeatureCollection
      } else {
        geojson = { type: "FeatureCollection", features: [suggestGeojson as Feature] }
      }

      //結果をgeojsonStoreに格納
      setGeojson(geojson)

      addGeoJsonLayer(getLastGeojson())

      const responseMessage: ChatType = {
        type: "response",
        message: `【表示結果】${message}`,
        isdata: true,
      }

      //responseタイプのチャットをストアに追加
      addChatMessage(responseMessage)
    } catch (error) {
      const errorMessage: ChatType = { type: "error", message: error, isdata: false }

      //エラー発生時、errorタイプのチャットをストアに追加
      addChatMessage(errorMessage)
    }
  }
  /**
   * 送信ボタン押下
   * @param inputValue string
   */
  const submitButtonClicked = async (inputValue: string) => {
    // ✅ 空文字の時は何もしない
    if (!inputValue.trim()) return

    // ✅ 特定の危険文字のみ禁止
    const invalidCharPattern = /[\u0000-\u001F\u007F\uFEFF'"<>!\/\\;|&`$%^@]/u

    if (invalidCharPattern.test(inputValue)) {
      const errorMessage: ChatType = {
        type: "error",
        message: "使用できない記号（BOM・クォーテーション・< > ! / など）が含まれています。",
        isdata: false,
      }
      addChatMessage(errorMessage)
      return
    }

    // ✅ 文字数制限（例：最大255文字）
    if (inputValue.length > 255) {
      const errorMessage: ChatType = {
        type: "error",
        message: "メッセージが長すぎます。255文字以内で入力してください。",
        isdata: false,
      }
      addChatMessage(errorMessage)
      return
    }

    // メッセージ送信後にメインパネルを開く
    openMainPanel()

    const requestMessage: ChatType = {
      type: "request",
      message: inputValue,
      isdata: false,
    }

    //requestタイプのチャットをストアに追加
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

      //結果をgeojsonStoreに格納
      setGeojson(geojson)

      addGeoJsonLayer(getLastGeojson())

      const responseMessage: ChatType = {
        type: "response",
        message: `【表示結果】${inputValue}`,
        isdata: true,
      }

      //responseタイプのチャットをストアに追加
      addChatMessage(responseMessage)
    } catch (error) {
      const errorMessage: ChatType = { type: "error", message: error, isdata: false }

      //エラー発生時、errorタイプのチャットをストアに追加
      addChatMessage(errorMessage)
    }
  }

  return {
    getMainPanelOpen,
    toggleMainPanel,
    getPullTabIcon,
    submitButtonClicked,
    suggestButtonClicked,
    isBlankChat,
  }
}
export default useChatPanelApp
