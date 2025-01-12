import { create } from "zustand"
import { IDialogState } from "@/domain/interfaces/IDialogState"

// ダイアログの開閉状態を管理するストア
// セッターの引数にtrueを入れると開いている状態、falseを入れると閉じている状態にできる
// ゲッターで状態を取得する
const useDialogStateStore = create<IDialogState>()((set, get) => ({
  //詳細情報ダイアログの開閉状態
  isDetailInfoDialogOpen: false,
  //レイヤーダイアログの開閉状態
  isLayerBarOpen: true,
  //詳細情報ダイアログのセッター
  setDetailInfoDialogOpen: (isOpen: boolean) => set(() => ({ isDetailInfoDialogOpen: isOpen })),

  //レイヤーダイアログのセッター
  setLayerBarOpen: (isOpen: boolean) => set(() => ({ isLayerBarOpen: isOpen })),
  //詳細情報ダイアログのセッター
  getDetailInfoDialogOpen: () => get().isDetailInfoDialogOpen,

  //レイヤーダイアログのセッター
  getLayerBarOpen: () => get().isLayerBarOpen,
}))

export default useDialogStateStore
