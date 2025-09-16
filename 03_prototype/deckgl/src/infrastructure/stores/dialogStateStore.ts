import { create } from "zustand"
import { IDialogState } from "@/domain/interfaces/IDialogState"

// ダイアログの開閉状態を管理するストア
// セッターの引数にtrueを入れると開いている状態、falseを入れると閉じている状態にできる
// ゲッターで状態を取得する
const useDialogStateStore = create<IDialogState>()((set, get) => ({
  //メインパネルの開閉状態
  isMainPanelOpen: true,
  //メインパネルのセッター
  setMainPanelOpen: (isOpen: boolean) => set(() => ({ isMainPanelOpen: isOpen })),
  //メインパネルのゲッター
  getMainPanelOpen: () => get().isMainPanelOpen,
}))

export default useDialogStateStore
