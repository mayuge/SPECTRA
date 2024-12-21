import { create } from "zustand"

interface DialogStateState {
  isDetailInfoDialogOpen: boolean
  isMovieDialogOpen: boolean
  isLayerBarOpen: boolean
  setDetailInfoDialogOpen: (isOpen: boolean) => void
  setMovieDialogOpen: (isOpen: boolean) => void
  setLayerBarOpen: (isOpen: boolean) => void
  getDetailInfoDialogOpen: () => boolean
  getMovieDialogOpen: () => boolean
  getLayerBarOpen: () => boolean
}

// ダイアログの開閉状態を管理するストア
// セッターの引数にtrueを入れると開いている状態、falseを入れると閉じている状態にできる
// ゲッターで状態を取得する
const useDialogStateStore = create<DialogStateState>()(
    (set, get) => ({
      //詳細情報ダイアログの開閉状態
      isDetailInfoDialogOpen: false,
      //動画ダイアログの開閉状態
      isMovieDialogOpen: false,
      //レイヤーダイアログの開閉状態
      isLayerBarOpen: true,
      //詳細情報ダイアログのセッター
      setDetailInfoDialogOpen: (isOpen: boolean) => set(() => ({ isDetailInfoDialogOpen: isOpen })),
      //動画ダイアログのセッター
      setMovieDialogOpen: (isOpen: boolean) => set(() => ({ isMovieDialogOpen: isOpen })),
      //レイヤーダイアログのセッター
      setLayerBarOpen: (isOpen: boolean) => set(() => ({ isLayerBarOpen: isOpen })),
      //詳細情報ダイアログのセッター
      getDetailInfoDialogOpen: () => get().isDetailInfoDialogOpen,
      //動画ダイアログのセッター
      getMovieDialogOpen: () => get().isMovieDialogOpen,
      //レイヤーダイアログのセッター
      getLayerBarOpen: () => get().isLayerBarOpen,
    }),
)

export default useDialogStateStore
