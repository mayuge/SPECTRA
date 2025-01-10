export interface IDialogState {
  isDetailInfoDialogOpen: boolean
  isLayerBarOpen: boolean
  setDetailInfoDialogOpen: (isOpen: boolean) => void
  setLayerBarOpen: (isOpen: boolean) => void
  getDetailInfoDialogOpen: () => boolean
  getLayerBarOpen: () => boolean
}