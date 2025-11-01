import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"
import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { DialogNameType } from "@/domain/types/dialogNameType"
import type { Feature, FeatureCollection } from "geojson"
const useChatPanelApp = (
  dialogState: IDialogState,
  reqChatApi: IReqChatApi,
  mapInstance: IMapInstance,
  mapLayer: IMapLayer
) => {
  const { getDialogState, toggleDialogState } = dialogState
  const { sendChatMessage } = reqChatApi
  const { addGeoJsonLayer } = mapLayer
  const { getMapInstance } = mapInstance

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
    const geojsonFeatureOrCollection: Feature | FeatureCollection | null =
      await sendChatMessage(inputValue)
    if (!geojsonFeatureOrCollection) return

    // Feature なら FeatureCollection に変換
    const geojson: FeatureCollection =
      geojsonFeatureOrCollection.type === "FeatureCollection"
        ? geojsonFeatureOrCollection
        : { type: "FeatureCollection", features: [geojsonFeatureOrCollection as Feature] }

    const map = getMapInstance()
    if (map.loaded()) {
      addGeoJsonLayer(map, geojson)
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
