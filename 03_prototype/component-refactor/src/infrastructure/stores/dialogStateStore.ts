import { create } from "zustand"
import { IDialogState } from "@/domain/interfaces/IDialogState"

// ダイアログの開閉状態を管理するストア
// セッターの引数にtrueを入れると開いている状態、falseを入れると閉じている状態にできる
// ゲッターで状態を取得する
const useDialogStateStore = create<IDialogState>()((set, get) => ({
  //選択モード表示ダイアログの開閉状態
  isModeDialogOpen: true,
  //詳細情報ダイアログの開閉状態
  isDetailInfoDialogOpen: false,
  //レイヤーダイアログの開閉状態
  isLayerBarOpen: true,
  //選択モード表示ダイアログのセッター
  setModeDialogOpen: (isOpen: boolean) => set(() => ({ isModeDialogOpen: isOpen })),
  //詳細情報ダイアログのセッター
  setDetailInfoDialogOpen: (isOpen: boolean) => set(() => ({ isDetailInfoDialogOpen: isOpen })),
  //レイヤーダイアログのセッター
  setLayerBarOpen: (isOpen: boolean) => set(() => ({ isLayerBarOpen: isOpen })),
  //詳細情報ダイアログのセッター
  getDetailInfoDialogOpen: () => get().isDetailInfoDialogOpen,
  //選択モード表示ダイアログのセッター
  getModeDialogOpen: () => get().isModeDialogOpen,
  //レイヤーダイアログのセッター
  getLayerBarOpen: () => get().isLayerBarOpen,
}))

export default useDialogStateStore
