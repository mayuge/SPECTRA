export interface IDialogState {
  //メインパネルの開閉状態
  isMainPanelOpen: boolean
  //メインパネルのセッター
  setMainPanelOpen: (isOpen: boolean) => void
  //メインパネルのゲッター
  getMainPanelOpen: () => boolean
}
