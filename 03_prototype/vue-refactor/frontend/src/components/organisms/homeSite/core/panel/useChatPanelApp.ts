import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { DialogNameType } from "@/domain/types/dialogNameType"
const useChatPanelApp = (dialogState: IDialogState) => {
  const { getDialogState, toggleDialogState } = dialogState

  /**
   * メインパネルの開閉状態
   * @returns boolean
   */
  const getMainPanelOpen = () => {
    return getDialogState("mainPanel" as keyof DialogNameType)
  }

  /**
   * メインパネルの開閉切り替え
   * @return void
   */
  const toggleMainPanel = () => {
    toggleDialogState("mainPanel" as keyof DialogNameType)
  }

  /**
   *  プルタブのアイコン取得
   * @returns "arrow_left" | "arrow_right"
   */
  const getPullTabIcon = () => {
    return getDialogState("mainPanel" as keyof DialogNameType) ? "arrow_left" : "arrow_right"
  }

  return {
    getMainPanelOpen,
    toggleMainPanel,
    getPullTabIcon,
  }
}
export default useChatPanelApp
