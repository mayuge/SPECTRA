export interface IDialogState {
  //メインパネルのセッター
  setMainPanelOpen: (isOpen: boolean) => void
  //メインパネルのゲッター
  getMainPanelOpen: () => boolean
}
