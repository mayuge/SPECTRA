import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"
import type { IReqSuggestApi } from "@/domain/interfaces/IReqSuggestApi"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"
import type { ILoadingState } from "@/domain/interfaces/ILoadingState"
import type { IGeoProcessing } from "@/domain/interfaces/IGeoprocessing"

import type { DialogNameType } from "@/domain/types/dialogNameType"
import type { ChatType } from "@/domain/types/chatType"
import type { SuggestType } from "@/domain/types/suggestType"
import type { Feature, FeatureCollection } from "geojson"

import { MAIN_PANEL } from "@/domain/params/dialogName"
import { PULLTAB_LEFT_ICON, PULLTAB_RIGHT_ICON } from "@/domain/params/iconText"

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
  geojsonState: IGeojsonState,
  loadingState: ILoadingState,
  geoProcessing: IGeoProcessing
) => {
  const {
    getDialogState,
    setDialogState,
    toggleDialogState,
    getPanelWidth,
    startResize,
    stopResize,
  } = dialogState
  const { sendChatMessage } = reqChatApi
  const { getSuggestData } = reqSuggestApi
  const { addGeoJsonLayer } = mapLayer
  const { addChatMessage, getChatMessageList, getChatHistory } = chatState
  const { setGeojson, getLastGeojson, getGeojsonByIndex } = geojsonState
  const { startLoading, stopLoading, getIsLoading } = loadingState
  const { intersectGeojson } = geoProcessing
  /**
   * メインパネルの開閉状態取得
   */
  const getMainPanelOpen = () => {
    return getDialogState(MAIN_PANEL as keyof DialogNameType)
  }

  /**
   * メインパネルを開く
   */
  const openMainPanel = () => {
    setDialogState(MAIN_PANEL as keyof DialogNameType, true)
  }

  /**
   * メインパネル切替
   */
  const toggleMainPanel = () => {
    toggleDialogState(MAIN_PANEL as keyof DialogNameType)
  }

  /**
   * プルタブのアイコンを取得
   * @returns "arrow_left" | "arrow_right"
   */
  const getPullTabIcon = () => {
    return getDialogState(MAIN_PANEL as keyof DialogNameType)
      ? PULLTAB_LEFT_ICON
      : PULLTAB_RIGHT_ICON
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
    // ローディング中は追加で質問できないようにする
    if (getIsLoading()) {
      return
    }
    startLoading()
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
      stopLoading()
    } catch (error) {
      const errorMessage: ChatType = { type: "error", message: error, isdata: false }

      //エラー発生時、errorタイプのチャットをストアに追加
      addChatMessage(errorMessage)
      stopLoading()
    }
  }

  /**
   * 送信ボタン押下
   * @param message string
   */
  const submitButtonClicked = async (messageText: string) => {
    // ローディング中は追加で質問できないようにする
    if (getIsLoading()) {
      return
    }
    // 空文字の時は何もしない
    if (!messageText.trim()) {
      return
    }

    //特定の危険文字のみ禁止
    const invalidCharPattern = /[\u0000-\u001F\u007F\uFEFF'"<>!\/\\;|&`$%^@]/u

    if (invalidCharPattern.test(messageText)) {
      const errorMessage: ChatType = {
        type: "error",
        message: "使用できない記号（BOM・クォーテーション・< > ! / など）が含まれています。",
        isdata: false,
      }
      addChatMessage(errorMessage)
      return
    }

    // ✅ 文字数制限（例：最大255文字）
    if (messageText.length > 255) {
      const errorMessage: ChatType = {
        type: "error",
        message: "メッセージが長すぎます。255文字以内で入力してください。",
        isdata: false,
      }
      addChatMessage(errorMessage)
      return
    }

    startLoading()
    // メッセージ送信後にメインパネルを開く
    openMainPanel()

    const requestMessage: ChatType = {
      type: "request",
      message: messageText,
      isdata: false,
    }

    //requestタイプのチャットをストアに追加
    addChatMessage(requestMessage)

    try {
      //メッセージをchatのapiへ送信
      const chatGeojson: Feature | FeatureCollection | null = await sendChatMessage(messageText)

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
        message: `【表示結果】${messageText}`,
        isdata: true,
      }

      //responseタイプのチャットをストアに追加
      addChatMessage(responseMessage)
      stopLoading()
    } catch (error) {
      const errorMessage: ChatType = { type: "error", message: error, isdata: false }

      //エラー発生時、errorタイプのチャットをストアに追加
      addChatMessage(errorMessage)
      stopLoading()
    }
  }

  const feedbackBadgeClicked = async (suggest: SuggestType) => {
    // ローディング中は追加で質問できないようにする
    if (getIsLoading()) {
      return
    }
    startLoading()
    openMainPanel()
    const chatMessageList = getChatMessageList()
    // メインGeoJSONに対応する最後のデータを持つチャットメッセージを取得
    const mainChatMessage = chatMessageList
      .slice()
      .reverse()
      .find((msg) => msg.isdata)
    const feedbackMessage: ChatType = {
      type: "request",
      message: `"${suggest.text}" と "${mainChatMessage?.message || "なし"}" の共通部分`,
      isdata: false,
    }
    addChatMessage(feedbackMessage)
    try {
      const suggestGeojson: Feature | FeatureCollection | null = await getSuggestData(suggest.url)
      // 共通部分を抽出
      const mainGeojson = getLastGeojson()
      const resultGeojson = intersectGeojson(
        mainGeojson as FeatureCollection,
        suggestGeojson as FeatureCollection
      )
      //結果をgeojsonStoreに格納
      setGeojson(resultGeojson)
      addGeoJsonLayer(getLastGeojson())
      const responseMessage: ChatType = {
        type: "response",
        message: `"${suggest.text}" と"${mainChatMessage?.message || "なし"}" の共通部分`,
        isdata: true,
      }
      //responseタイプのチャットをストアに追加
      addChatMessage(responseMessage)
      stopLoading()
    } catch (error) {
      const errorMessage: ChatType = { type: "error", message: error, isdata: false }
      //エラー発生時、errorタイプのチャットをストアに追加
      addChatMessage(errorMessage)
    }
    stopLoading()
  }

  /**
   * @param messageText
   * @param index
   * @returns
   */
  const feedbackButtonClicked = async (messageText: string, index: number) => {
    // ローディング中は追加で質問できないようにする
    if (getIsLoading()) {
      return
    }
    // 空文字の時は何もしない
    if (!messageText.trim()) {
      return
    }
    startLoading()
    // メッセージ送信後にメインパネルを開く
    openMainPanel()

    console.log("フィードバックボタンがクリックされました:", messageText, index)

    const chatMessageList = getChatMessageList()
    const targetChatMessage = chatMessageList[index]

    //既存のgeojsonを取得
    const mainGeojson = getGeojsonByIndex(index)

    //チャットメッセージに基づき新たなgeojsonを取得
    try {
      const chatGeojson: Feature | FeatureCollection | null = await sendChatMessage(messageText)
      // 共通部分を抽出
      const resultGeojson = intersectGeojson(
        mainGeojson as FeatureCollection,
        chatGeojson as FeatureCollection
      )
      //結果をgeojsonStoreに格納
      setGeojson(resultGeojson)
      addGeoJsonLayer(getLastGeojson())

      const responseMessage: ChatType = {
        type: "response",
        message: `"${messageText}" と チャット: "${targetChatMessage?.message || "なし"}" の共通部分`,
        isdata: true,
      }
      //responseタイプのチャットをストアに追加
      addChatMessage(responseMessage)
    } catch (error) {
      const errorMessage: ChatType = { type: "error", message: error, isdata: false }
      //エラー発生時、errorタイプのチャットをストアに追加
      addChatMessage(errorMessage)
    }
    stopLoading()
  }

  return {
    getMainPanelOpen,
    toggleMainPanel,
    getPullTabIcon,
    submitButtonClicked,
    suggestButtonClicked,
    feedbackButtonClicked,
    feedbackBadgeClicked,
    isBlankChat,
    getIsLoading,
    getChatHistory,
    getPanelWidth,
    startResize,
    stopResize,
  }
}
export default useChatPanelApp
