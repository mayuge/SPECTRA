export interface IDialogState {
  isModeDialogOpen: boolean
  isDetailInfoDialogOpen: boolean
  isLayerBarOpen: boolean
  setModeDialogOpen: (isOpen: boolean) => void
  setDetailInfoDialogOpen: (isOpen: boolean) => void
  setLayerBarOpen: (isOpen: boolean) => void
  getModeDialogOpen: () => boolean
  getDetailInfoDialogOpen: () => boolean
  getLayerBarOpen: () => boolean
}
