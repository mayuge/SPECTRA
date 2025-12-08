export interface ILoadingState {
  startLoading: () => void
  stopLoading: () => void
  getIsLoading: () => boolean
}
